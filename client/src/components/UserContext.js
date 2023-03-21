import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { loading, data } = useQuery(QUERY_ME);
  const [fetchId, setFetchId] = useState(false);
  console.log(data)
  
//set user id in localStorage
  useEffect(() => {
    if (localStorage.getItem('userId') === null) {
      
      if (data !== undefined && loading === false) {
        localStorage.setItem('userId', data?.me._id);
        localStorage.setItem('firstName', data?.me.firstName)
        setFetchId(true);
      }
    } else {
      setFetchId(true);
    }
  }, [data, loading]);

  return <UserContext.Provider value={{ fetchId }}>{children}</UserContext.Provider>;
};

export { UserContextProvider, UserContext };
