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
  const [dialing, setDialing] = useState(false)

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  //Connect user to socket
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
    //handle call ended signal from server
    socket.on('callEnded', () => {
      setCallEnded(true);
      leaveCall();
    });
    //handle receiving call
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setDialing(true)
      initVideo()
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, [userId, name]);

  //function for answer call
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
      setPartnerId(call.from);
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  //init video feed
  const initVideo = async() => {
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);

      myVideo.current.srcObject = currentStream;

    });
  
  }

  // function for calling user
  const callUser = (id) => {
    initVideo()
    setDialing(true)
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log(name)
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name: name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      setPartnerId(id);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };
//send end call to server to disconnect both parties
  const endCall = () => {
    socket.emit('endCall', { partnerId: partnerId, userId: me });
  };

  const leaveCall = () => {
    socket.disconnect();
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
        onlineUsers,
        dialing
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
