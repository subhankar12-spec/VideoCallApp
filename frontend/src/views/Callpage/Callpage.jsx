import React, { useEffect, useRef, useState, useCallback } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { APIBaseURL } from '../../constants';
import { useLocation } from 'react-router-dom';
import { VideoFrame } from '../../components/VideoFrame/VideoFrame';
import VideoCallBar from '../../components/VideoCallBar/VideoCallBar';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, Box, createTheme, Grid, styled } from '@mui/material';
import './Callpage.css';
// //
// import * as process from 'process';
// global.process = process;

const Callpage = () => {
  const navigate = useNavigate();
  const userVideo = useRef(document.createElement('video'));
  const userStream = useRef();

  const socketRef = useRef();
  const peersRef = useRef([]);
  const [peers, setPeers] = useState([]);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const inputRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [roomID, setRoomId] = useState();
  const [isPresenting, setIsPresenting] = useState(false);
  const [screenCastStream, setScreenCastStream] = useState();
  let peer = null;

  const search = useLocation().search;
  const params = new URLSearchParams(search);
  useEffect(() => {
    // console.log('useEffect');
    init();
  }, []);

  const init = useCallback(async () => {
    socketRef.current = io.connect(APIBaseURL);
    // console.log('init');
    //get media stream from user (ask permission from browser)
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    userVideo.current.srcObject = userStream.current = stream;

    //check if the user is creating a meet or joining a meet
    if (params.get('host') && !params.get('room')) {
      // console.log(localStorage.getItem('meetname'));
      socketRef.current.emit('start meet', {
        token: localStorage.getItem('idToken'),
        meetname: localStorage.getItem('meetname'),
      });

      socketRef.current.on('roomID', (roomID) => {
        // console.log(roomID);
        setRoomId(roomID);
        window.history.replaceState('', '', `?room=${roomID}`);
      });
    } else {
      //error handling for invalid urls
      if (
        params.get('host') ||
        !params.get('room') ||
        typeof params.get('room') !== 'string'
      ) {
        alert('Enter a valid url');
        return;
      }
      //if the url is correct , join meet request sent to backend with user details
      //triggered when call page is called directly
      socketRef.current.emit('join room', {
        roomID: params.get('room'),
        token: localStorage.getItem('idToken'),
      });

      socketRef.current.on('invalid room', () => {
        alert('Invalid room');
        return;
      });
      //if no of participants are greater than 100 room is full
      socketRef.current.on('room full', () => {
        alert('Room full');
        return;
      });
    }

    //get all member details and create peers
    socketRef.current.on('all members', (members) => {
      console.log('members', members);
      const peers = members.map((member) => {
        const peer = createPeer(member.id, socketRef.current.id, stream);

        const peerObj = {
          peerID: member.id,
          peer,
          username: member.username,
        };
        peersRef.current.push(peerObj);
        return peerObj;
      });

      setPeers(peers);
    });

    //connection for peer join
    socketRef.current.on('user joined', (payload) => {
      const { signal, id, username } = payload;
      console.log('user joined', username);
      // const item = peersRef.current.find((p) => p.peerID === id);
      // if (!item) {
      const peer = addPeer(signal, id, stream);
      const peerObj = {
        peerID: id,
        peer,
        username,
      };
      peersRef.current.push(peerObj);
      addPeerVideo(peerObj);
      // socketRef.current.emit('ready');
      // }
      // console.log(signal);
      // const peer = addPeer(signal, id, stream);
      // const peerObj = {
      //   peerID: id,
      //   peer,
      //   username,
      // };
      // peersRef.current.push(peerObj);
      // addPeerVideo(peerObj);
      // addToChat({ message: username + ' joined the meet ' });
    });

    socketRef.current.on('receiving returned signal', (payload) => {
      console.log('receiving returned signal');
      const { signal, id } = payload;

      const item = peersRef.current.find((p) => p.peerID === id);

      if (item) {
        item.peer.signal(signal);
        console.log('Answer accepted');
      }
    });

    // //user disconnected
    // socketRef.current.on('disconnected', ({ id, username }) => {
    //   disconnected({ id, username });
    // });

    //error handling
    socketRef.current.on('something broke', (message) => {
      alert(message);
      // exit();
    });
  }, []);

  //Create new peer add ice servers
  const createPeer = useCallback((userToSignal, callerID, stream) => {
    console.log('create peer Called');
    const peer = new Peer({
      initiator: true,
      offerOptions: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      },
      trickle: false,
      // config: {
      //   iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      // },
      stream,
    });
    peer.on('signal', (signal) => {
      console.log('sending signal', signal);

      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }, []);

  const addPeer = useCallback((incomingSignal, callerID, stream) => {
    console.log('add peer');
    const peer = new Peer({
      initiator: false,
      /*https://github.com/feross/simple-peer/issues/95*/
      answerOptions: {
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      },
      trickle: false,
      // config: {
      //   iceServers: [
      //     { urls: 'stun:stun.l.google.com:19302' },
      //     { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
      //   ],
      // },
      stream,
    });

    peer.on('signal', (signal) => {
      console.log('returning signal', signal);
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);
    console.log('Hehe');
    return peer;
  }, []);

  const addPeerVideo = useCallback((peerObj) => {
    setPeers((peers) => [...peers, peerObj]);
  }, []);

  //audio on/off handler
  const audioHandler = () => {
    console.log(audio);
    setAudio(!audio);
    userStream.current.getAudioTracks()[0].enabled =
      !userStream.current.getAudioTracks()[0].enabled;
  };
  // //video on/off handler
  const videoHandler = () => {
    console.log(video);
    setVideo(!video);
    userStream.current.getVideoTracks()[0].enabled =
      !userStream.current.getVideoTracks()[0].enabled;
  };

  const disconnect = useCallback(() => {
    socketRef.current.disconnect();
    navigate('/protected');
    userStream.current?.getTracks().forEach((track) => {
      track.stop();
    });
  }, []);

  //chat socket connection
  useEffect(() => {
    socketRef.current.on('receive-message', (payload) => {
      console.log('read..');
      console.log(payload);
      addToChat(payload);
    });
  }, []);
  const sendMessage = useCallback((e) => {
    e.preventDefault();
    console.log('send');
    if (inputRef.current && inputRef.current?.value !== '') {
      const val = inputRef.current?.value;
      socketRef.current.emit('message', val);
      const chatObj = {
        // sender: auth.displayName,
        message: val,
        id: 'me',
      };
      addToChat(chatObj);
      inputRef.current.value = '';
    }
  }, []);
  const addToChat = useCallback((chatObj) => {
    console.log(chatObj);
    console.log('add');
    setChats((chats) => [...chats, chatObj]);
  }, []);

  const screenShare = () => {
    console.log('screenShare');
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        peers.replaceTrack(
          userStream.current.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          userStream.current
        );
        setScreenCastStream(screenStream);
        screenStream.getTracks()[0].onended = () => {
          peers.replaceTrack(
            screenStream.getVideoTracks()[0],
            userStream.current.getVideoTracks()[0],
            userStream.current
          );
        };
        setIsPresenting(true);
      });
  };
  const stopScreenShare = () => {
    console.log('StopscreenShare');
    screenCastStream.getVideoTracks().forEach(function (track) {
      track.stop();
    });
    peers.replaceTrack(
      screenCastStream.getVideoTracks()[0],
      userStream.current.getVideoTracks()[0],
      userStream.current
    );
    setIsPresenting(false);
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const UserBox = styled(Box)({
    // height: '100%',
  });
  return (
    <div className="vidBody">
      <div className="cont">
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '85vh' }}
        >
          {peers.map((peer, index) => (
            <Grid item xs={12} sm={4}>
              <p id="overlay" style={{ color: 'white' }}>
                {peer.username}
              </p>
              <VideoFrame key={index} peer={peer.peer} />
            </Grid>
          ))}
          <Grid item xs={12} sm={4}>
            <p id="overlay" style={{ color: 'white' }}></p>
            <video
              id="my-video"
              muted
              autoPlay
              ref={userVideo}
              playsInline
            ></video>
          </Grid>
        </Grid>
      </div>
      <VideoCallBar
        audio={audio}
        audioHandler={audioHandler}
        video={video}
        videoHandler={videoHandler}
        disconnect={disconnect}
        isPresenting={isPresenting}
        screenShare={screenShare}
        stopScreenShare={stopScreenShare}
      />
    </div>
  );
};

export default Callpage;
