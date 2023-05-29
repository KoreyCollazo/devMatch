import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GET_MATCHES } from '../utils/queries';
import Auth from '../utils/auth';

const Matches = () => {
  const { userId } = useParams();
  console.log(userId);

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
          <div className="row" key={match._id}>
            <div className="col s12 m8">
              <a href={`/profile/${match._id}`}>
                <div className="card-panel-user">
                  <li>
                    <h4>Email: {match.email}</h4>
                    <h5>{match.firstName && <div>{match.firstName}</div>}</h5>
                    <div>{match.photo}</div>
                    <h4>
                      Age: {match.age}
                      <div>Height: {match.height}</div>
                      <div>Education: {match.education}</div>
                      <div>Bio: {match.bio}</div>
                      <div>Gender: {match.gender}</div>
                      <div>Location: {match.location}</div>
                      <div>Ethnicity: {match.ethnicity}</div>
                    </h4>
                    <div>
                      <h4>Match Score:</h4>{' '}
                    </div>
                    <button className="btn-floating btn-large waves-effect waves-light teal">
                      <div>{match.matchScore}</div>
                    </button>
                  </li>
                </div>
              </a>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Matches;
