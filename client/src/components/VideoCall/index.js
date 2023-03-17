import React, {useContext, useEffect} from 'react'
import VideoPlayer from './videoPlayer';
import Notifications from './notification';
import Options from './options';
import { ContextProvider } from '../SocketContext';
import { UserContext } from '../UserContext'

const VideoCall = () => {
    
    const { fetchId } = useContext(UserContext)
    useEffect(() => {

    }, [fetchId])
    

    return (
       
                  <ContextProvider >
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