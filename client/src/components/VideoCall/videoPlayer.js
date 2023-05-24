/* eslint-disable jsx-a11y/heading-has-content */
import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, setStream, call, dialing } =
    useContext(SocketContext);

    
  useEffect(() => {
    
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
        setStream(currentStream);
  
        myVideo.current.srcObject = currentStream;
      });
      
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callEnded, dialing]);


  return (
    <div>
      {/* client video */}
      {dialing && (
        <div>
          <h2 value={name}></h2>
          <video playsInline muted ref={myVideo} autoPlay />
        </div>
      )}

      {/* guest video */}
      {callAccepted && !callEnded && stream && (
        <div>
          <h2 value={call.name}></h2>
          <video playsInline ref={userVideo} autoPlay />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
