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
    <>
    <ul>
      {data.getMatches.map((match) => (
        <div className="row">
          <div className="col s12 m5">
            <div className="card-panel teal">
              <li key={match._id}>
                <h4>Email: {match.email}</h4>
                <h5>{match.firstName && <div>{match.firstName}</div>}</h5>
                
                  {match.lastName && <div>{match.lastName}</div>}
                  <div>{match.photo}</div>
                  <div>Age: {match.age}</div>
                  <div>Height: {match.height}</div>
                  <div>Education: {match.education}</div>
                  <div>Bio: {match.bio}</div>
                  <div>Gender: {match.gender}</div>
                  <div>Location: {match.location}</div>
                  <div>Ethnicity: {match.ethnicity}</div>
                  <div>Match Score: </div><button className="btn-floating btn-large waves-effect waves-light red"><div>{match.matchScore}</div>
                </button>
              </li>
            </div>
          </div>
        </div>
      ))}
    </ul></>
  );
};
export default Matches;
