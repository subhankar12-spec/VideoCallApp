import React, { useRef, useEffect } from 'react';

//meet members(peers) video frame
export const VideoFrame = (props) => {
  console.log('In Peer video');
  const ref = useRef(document.createElement('video'));

  useEffect(() => {
    console.log('In UseEffect');
    props.peer.on('stream', (stream) => {
      console.log('Stream Called');
      ref.current.srcObject = stream;
      console.log(stream.getTracks()[1]);
    });
  }, []);

  return <video id="my-video" autoPlay ref={ref} playsInline></video>;
};
