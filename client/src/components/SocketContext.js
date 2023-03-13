import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';



const SocketContext = createContext();

const socket = io('http://localhost:3001');

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState();
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    


    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream
            });
        socket.connect();
        setCallEnded(false);
        socket.on('me', (id) => setMe(id));
        socket.on('callEnded', () => {
            socket.disconnect()
            setCallEnded(true);
            connectionRef.current.destroy();
            window.location.reload();
        })

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal })
        });
    }, [callEnded]);

    const answerCall = () => {
        setCallAccepted(true);
        setCallEnded(false);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from })
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
      console.log(id);
      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on('signal', (data) => {
        socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
      });

      

      peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });

      socket.on('callAccepted', (signal) => {
        setCallAccepted(true);

        peer.signal(signal);
      });

      connectionRef.current = peer;
    };

    const leaveCall = () => {
        socket.disconnect()
            setCallEnded(true);
            connectionRef.current.destroy();
            window.location.reload();

    
    }

    return (
        <SocketContext.Provider value={{ callAccepted, call, myVideo, userVideo, stream, setStream, name, setName, callEnded, me, callUser, leaveCall, answerCall, }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext}