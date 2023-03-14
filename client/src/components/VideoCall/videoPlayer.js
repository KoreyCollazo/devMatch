import React, { useContext } from 'react'
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

    return (
        <div>
            {/* client video */}
            {
                stream && (
                    <div>
                        <h2 value={name}></h2>
                        <video playsInline muted ref={myVideo} autoPlay/>
                    </div>
                    
                )}
            
            {/* guest video */}
            {
                callAccepted && !callEnded && stream && (
                    <div>
                        <h2 value={call.name}></h2>
                        <video playsInline ref={userVideo} autoPlay/>
                    </div>
                    
                )
            }
        </div>
    );
}

export default VideoPlayer;