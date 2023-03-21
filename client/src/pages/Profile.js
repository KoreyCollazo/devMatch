import React, { useContext, useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import VideoCall from '../components/VideoCall';
import { SocketContext } from '../components/SocketContext';

import { Link } from 'react-router-dom';

import { QUERY_SINGLE_USER, QUERY_ME, QUERY_GET_MATCHES } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { onlineUsers } = useContext(SocketContext);
  const [ myProfile, setMyProfile ] = useState(false)
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    navigate(`/about`);
  };

  const { userId } = useParams();
  console.log(userId);

  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId: userId }
  });

  // const savedMatches = () => {
  //   if()
  // }
  const { data: matchData } = useQuery(QUERY_GET_MATCHES);
  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_USER` query
  const user = data?.me || data?.user || {};
  console.log(matchData, 'undefined');
  
  const status = onlineUsers.find((o) => o.userId === user._id);

  useEffect(() => {
    if (window.location.pathname === "/profile"){
      setMyProfile(true)
    }
  }, [])
  

  // Use React Router's `<Navigate />` component to redirect to personal user page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
    return <Navigate to="/profile" />;
  }

  /* To do 
  once login in chnaged to log out button
  add button to go to about me page where user can fill out info  */

  if (loading) {
    return (
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!Auth.loggedIn()) {
    return (
      <div className="row">
        <div className="col s2 m12 center-align">
          <div className="card">
            <div className="card-content">
              <h4>You need to be logged in to see your profile page.</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  return (
  
    <div className="row">
      <div className="col s12 m4 l2 chat">
        <h1> VideoCall </h1>
        <VideoCall />
      </div>

      {/* card */}

      <div className="col s12 m8 l9">
        <div className="card">
          <button
            onSubmit={onSubmit}
            className="waves-effect waves-light btn green"
            style={{ cursor: 'pointer' }}
            type="submit">
            About
          </button>
          <div className="card-image">
            <img
              id="profile-picture"
              alt="headshot"
              src="https://img.icons8.com/plasticine/12x/morty-smith.png"
            />
            {status ? (
              <div className="btn-floating halfway-fab waves-effect waves-light green">
                <i className="material-icons"></i>
              </div>
            ) : (
              <div className="btn-floating halfway-fab waves-effect waves-light red">
                <i className="material-icons"></i>
              </div>
            )}
          </div>
          <div className="card-content">
            <h4 className="card-title">{user.firstName}, {user.age} Y/O</h4>
            <p>
              {user.bio}
            </p>
          </div>
          <div id="row">
            {myProfile ? (null):(
            <div id="buttons">
              <button id="dislike" className="waves-effect waves-light btn red" tab-index="1">
                <span className="dislike-emoji">Nope</span>
              </button>
              <button id="like" className="waves-effect waves-light btn green" tab-index="1">
                <span className="like-emoji">Yep</span>
              </button>
            </div>)}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
