import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

let socket = io('http://localhost:3001');

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState();
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const userId = localStorage.getItem('userId');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [partnerId, setPartnerId] = useState();

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    socket.on('get-users', (users) => {
      setOnlineUsers(users);
    });
    socket = io('http://localhost:3001');
    socket.on('me', (id) => {
      setMe(id);
    });

    socket.emit('new-user-add', userId);
  }, [userId]);

  useEffect(() => {
    console.log(userId);
    socket.on('callEnded', () => {
      setCallEnded(true);
      leaveCall();
    });

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, [userId, name]);

  // useEffect(() => {
  //     // Tab has focus
  //     const handleFocus = async () => {
  //         socket.emit("new-user-add", userId);
  //         socket.on("get-users", (users) => {
  //             setOnlineUsers(users);
  //         });
  //     };

  //     // Tab closed
  //     const handleBlur = () => {
  //       if(userId) {
  //         socket.emit("offline")
  //       }
  //     };

  //     // Track if the user changes the tab to determine when they are online
  //     window.addEventListener('focus', handleFocus);
  //     window.addEventListener('blur', handleBlur);

  //     return () => {
  //       window.removeEventListener('focus', handleFocus);
  //       window.removeEventListener('blur', handleBlur);
  //     };
  //   }, [userId]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
      setPartnerId(call.from);
      console.log(partnerId, 'partnerid');
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      setPartnerId(id);
      console.log(partnerId, 'partnerid');

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const endCall = () => {
    socket.emit('endCall', { partnerId: partnerId, userId: me });
    console.log({ partnerId: partnerId, userId: me });
  };

  const leaveCall = () => {
    socket.disconnect();
    connectionRef.current.destroy();
    window.location.reload(true);
  };

  return (
    <SocketContext.Provider
      value={{
        callAccepted,
        call,
        myVideo,
        userVideo,
        stream,
        setStream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        endCall,
        answerCall,
        onlineUsers
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
