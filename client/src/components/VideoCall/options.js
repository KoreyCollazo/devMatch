import React, { useContext, useState } from 'react'
import { SocketContext } from '../SocketContext';

const Options = ( { children }) => {
const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, stream } = useContext(SocketContext);
const [idToCall, setIdToCall] = useState('');
    return (
        <div>
            <div>
                <input label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input defaultValue={me}/>
                <input placeholder='id to call' value={idToCall} onChange={(e) => setIdToCall(e.target.value)}/>
                {callAccepted && !callEnded ? (
                    <div>
                        <button onClick={leaveCall}>
                            hang up
                        </button>
                        <button onClick={(e) => {
                            const audioTrack = stream.getTracks().find(track => track.kind === 'audio');
                            if (audioTrack.enabled){
                                audioTrack.enabled = false;
                                e.target.innerHTML = 'unmute'
                            } else {
                                audioTrack.enabled = true;
                                e.target.innerHTML = 'mute'
                            }
                        }}>
                            mute
                        </button>
                        <button onClick={(e) => {
                            const videoTrack = stream.getTracks().find(track => track.kind === 'video');
                            if (videoTrack.enabled){
                                videoTrack.enabled = false;
                                e.target.innerHTML = 'Enable Camera'
                            } else {
                                videoTrack.enabled = true;
                                e.target.innerHTML = 'Disable Camera'
                            }
                        }}>
                            camera
                        </button>
                    </div>
                ) : (
                    <button onClick={() => callUser(idToCall)}>
                        call
                    </button>
                )}
            </div>
            Options
            {children}
        </div>
    );
}

export default Options;