import React, { useContext, useEffect, useRef } from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
  const { name, callAccepted, userVideo, callEnded, stream, setStream, call, dialing, myVideo } =
    useContext(SocketContext);

  const myVideoRef = useRef(); // Create a separate ref for the myVideo element

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = currentStream; // Assign the stream to the video element
      }
    });
  }, [callEnded, dialing, setStream]);

  return (
    <div>
      {/* client video */}
      {dialing && (
        <div>
          <h2>{name}</h2>
          <video playsInline muted ref={myVideoRef} autoPlay />
        </div>
      )}

      {/* guest video */}
      {callAccepted && !callEnded && stream && (
        <div>
          <h2>{call.name}</h2>
          <video playsInline ref={userVideo} autoPlay />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
