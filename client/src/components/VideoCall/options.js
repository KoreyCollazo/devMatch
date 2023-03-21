import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../SocketContext';
import { useParams } from 'react-router-dom';



const Options = ({ children }) => {
  const { me, callAccepted, callEnded, endCall, callUser, stream, onlineUsers, call, answerCall, setName } =
    useContext(SocketContext);
    
  const [idToCall, setIdToCall] = useState('');
  const guest = useParams();
 
  //set id to call only if on another user's profile
  useEffect(() => {
    if (guest){
      let guestObj = onlineUsers.find(o => o.userId === guest?.userId.slice(1))
      setIdToCall(guestObj?.socketId)
    }
  }, [])
  
  setName(localStorage.getItem('firstName'))
  console.log(call)
 
  return (
    <div>
      <div>
        <div>
          {/* if receving a call display notification */}
      {call.isReceivingCall && !callAccepted && call.from !== me && (
        <div>
          <h1>{call.name} is calling: </h1>
          <button
            onClick={() => {
              answerCall();
            }}
          >
            answer
          </button>
        </div>
      )}
    </div>
    {/* display call options during call */}
        {callAccepted && !callEnded ? (
          <div>
            <button onClick={endCall}>hang up</button>
            <button
              onClick={(e) => {
                const audioTrack = stream.getTracks().find((track) => track.kind === 'audio');
                if (audioTrack.enabled) {
                  audioTrack.enabled = false;
                  e.target.innerHTML = 'unmute';
                } else {
                  audioTrack.enabled = true;
                  e.target.innerHTML = 'mute';
                }
              }}
            >
              mute
            </button>
            <button
              onClick={(e) => {
                const videoTrack = stream.getTracks().find((track) => track.kind === 'video');
                if (videoTrack.enabled) {
                  videoTrack.enabled = false;
                  e.target.innerHTML = 'Enable Camera';
                } else {
                  videoTrack.enabled = true;
                  e.target.innerHTML = 'Disable Camera';
                }
              }}
            >
              camera
            </button>
          </div>
        ) : (null)}
        {/* only show call button if profile is not yours and call hasn't started */}
        {window.location.pathname !== "/profile" && !callAccepted ? (<button onClick={() => {
            callUser(idToCall)
          }}>call</button>):(null)}
      </div>
      {children}
    </div>
  );
};

export default Options;
