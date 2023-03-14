import React from 'react'
import VideoPlayer from './videoPlayer';
import Notifications from './notification';
import Options from './options';
import { ContextProvider } from '../SocketContext';

const VideoCall = () => {
    return (
        <ContextProvider>
            <div>
                <VideoPlayer />
                <Options>
                    <Notifications />
                </Options>
            </div>
        </ContextProvider>
    );
}

export default VideoCall;