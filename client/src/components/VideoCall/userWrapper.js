import React from 'react';
import { UserContextProvider } from '../UserContext';
import VideoCall from '../VideoCall';

const UserWrapper = () => {
  return (
    <UserContextProvider>
      <VideoCall />
    </UserContextProvider>
  );
};

export default UserWrapper;
