import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import VideoCall from '../components/VideoCall';
// import { Link } from 'react-router-dom';
import { QUERY_GET_MATCHES } from '../utils/queries';
import Auth from '../utils/auth';

const Matches = () => {
  const { userId } = useParams();
  console.log(userId);
  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(QUERY_GET_MATCHES);

  if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <ul>
      {data.getMatches.map((match) => (
        <li key={match._id}>
          <div>Email: {match.email}</div>
          {match.firstName && <div>{match.firstName}</div>}
          {match.matchScore}
        </li>
      ))}
    </ul>
  );
};
export default Matches;
