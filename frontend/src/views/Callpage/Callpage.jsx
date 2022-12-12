import React, { useEffect, useRef, useState, useCallback } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { APIBaseURL } from '../../constants';
import { useLocation } from 'react-router-dom';
import { VideoFrame } from '../../components/VideoFrame/VideoFrame';
//
// import * as process from 'process';
// global.process = process;

const Callpage = () => {
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

  const search = useLocation().search;
  const params = new URLSearchParams(search);
  useEffect(() => {
    init();
  }, []);

  const init = useCallback(async () => {
    socketRef.current = io.connect(APIBaseURL);
    //get media stream from user (ask permission from browser)
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    userVideo.current.srcObject = userStream.current = stream;

    //check if the user is creating a meet or joining a meet
    if (params.get('host') && !params.get('room')) {
      console.log(localStorage.getItem('meetname'));
      socketRef.current.emit('start meet', {
        token: localStorage.getItem('idToken'),
        meetname: localStorage.getItem('meetname'),
      });

      socketRef.current.on('roomID', (roomID) => {
        console.log(roomID);
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
      console.log('members', members, members.id, socketRef.current.id);
      const peers = members.map((member) => {
        const peer = createPeer(member.id, socketRef.current.id, stream);
        console.log('stream', stream);

        const peerObj = {
          peerID: member.id,
          peer,
          username: member.username,
        };
        peersRef.current.push(peerObj);
        return peerObj;
      });
      console.log('peers', peers);
      setPeers(peers);
    });

    //connection for peer join
    socketRef.current.on('user joined', (payload) => {
      const { signal, id, username } = payload;
      console.log('user joined', username);
      const item = peersRef.current.find((p) => p.peerID === id);
      if (!item) {
        const peer = addPeer(signal, id, stream);
        const peerObj = {
          peerID: id,
          peer,
          username,
        };
        peersRef.current.push(peerObj);
        addPeerVideo(peerObj);
        socketRef.current.emit('ready');
      }
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
      const { signal, id } = payload;

      const item = peersRef.current.find((p) => p.peerID === id);
      console.log('receiving returned signal', signal, id);
      console.log('item', item);
      if (item) {
        console.log('item signal1');
        item.peer.signal(signal);
        console.log('item signal2');
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
    console.log('create peer', userToSignal, callerID, stream);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      // config: {
      //   iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      // },
      stream,
    });
    console.log('create peer2');
    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }, []);

  const addPeer = useCallback((incomingSignal, callerID, stream) => {
    // console.log("add peer")
    const peer = new Peer({
      initiator: false,
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
      console.log('signal', signal, callerID);
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);
    return peer;
  }, []);

  const addPeerVideo = useCallback((peerObj) => {
    setPeers((peers) => [...peers, peerObj]);
  }, []);

  // const removePeerVideo = useCallback((id) => {
  //   setPeers((peers) => peers.filter((peer) => peer.peerID !== id));
  // }, []);

  // //disconnect user
  // const exit = useCallback(() => {
  //   socketRef.current.disconnect();
  //   history.replace('/');
  //   userStream.current?.getTracks().forEach((track) => {
  //     track.stop();
  //   });
  // }, []);

  // const disconnected = useCallback(({ id, username }) => {
  //   alert(username + 'left the chat');
  //   addToChat({ message: username + ' left the chat' });
  //   peersRef.current = peersRef.current.filter((peer) => peer.peerID !== id);
  //   removePeerVideo(id);
  // }, []);

  //chat socket connection
  // useEffect(() => {
  //   socketRef.current.on('receive-message', (payload) => {
  //     console.log('read..');
  //     console.log(payload);
  //     addToChat(payload);
  //   });
  // }, []);
  // const sendMessage = useCallback((e) => {
  //   e.preventDefault();
  //   console.log('send');
  //   if (inputRef.current && inputRef.current?.value !== '') {
  //     const val = inputRef.current?.value;
  //     socketRef.current.emit('message', val);
  //     const chatObj = {
  //       sender: auth.displayName,
  //       message: val,
  //       id: 'me',
  //     };
  //     addToChat(chatObj);
  //     inputRef.current.value = '';
  //   }
  // }, []);
  // const addToChat = useCallback((chatObj) => {
  //   console.log(chatObj);
  //   console.log('add');
  //   setChats((chats) => [...chats, chatObj]);
  // }, []);

  // //audio on/off handler
  // const audioHandler = () => {
  //   console.log(audio);
  //   setAudio(!audio);
  //   userStream.current.getAudioTracks()[0].enabled =
  //     !userStream.current.getAudioTracks()[0].enabled;
  // };
  // //video on/off handler
  // const videoHandler = () => {
  //   console.log(video);
  //   setVideo(!video);
  //   userStream.current.getVideoTracks()[0].enabled =
  //     !userStream.current.getVideoTracks()[0].enabled;
  // };

  return (
    <div>
      Callpage
      <div>
        {/* //peers video */}
        {console.log(peers)}
        {peers.map((peer, index) => (
          <div>
            <p>{peer.username}</p>
            {console.log('peers', peer)}
            <VideoFrame key={index} peer={peer.peer} />
          </div>
        ))}
        <div>
          {/* // user video */}
          {/* <p>{peer.displayName}</p> */}
          <p>User Video</p>
          <video
            id="my-video"
            muted
            autoPlay
            ref={userVideo}
            playsInline
          ></video>
        </div>
      </div>
    </div>
  );
};

export default Callpage;
