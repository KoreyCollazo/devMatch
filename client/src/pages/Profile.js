import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import VideoCall from '../components/VideoCall';

import { Link } from 'react-router-dom';

import { QUERY_SINGLE_USER, QUERY_ME, QUERY_GET_MATCHES } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {

  const navigate = useNavigate();
    const onSubmit = async (event) => {
       event.preventDefault();
       navigate(`/about`);
    }
       
    
    
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

  // Use React Router's `<Navigate />` component to redirect to personal user page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
    return <Navigate to="/profile" />;
  }

  /* To do 
  once login in chnaged to log out button
  add button to go to about me page where user can fill out info  */

  if (loading) {
    return (
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!Auth.loggedIn()) {
    return (
      <div className="row">
        <div className="col s2 m12">
          <div className="card">
            <div className="card-content">
              <h4>You need to be logged in to see your profile page.</h4>
            </div>
            <div className="card-action">
              <button className="waves-effect waves-light btn greengit">
                <Link id="login" to={`/login`}>
                  Login
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // added about me button just for testing
  return (
    <div className="row">
        <div class="col s12 m4 l2 chat">
          <h1> Chat </h1>
        </div>

      <div className="col s12 m8 l9">
        <div className="card">

            <button onSubmit={onSubmit} className="waves-effect waves-light btn green" style={{ cursor: 'pointer' }}
                  type="submit">
              
                About
            
            </button>
          <div className="card-image">
            <img
              id="profile-picture"
              alt="headshot"
              src="https://img.icons8.com/plasticine/12x/morty-smith.png"
            />
            <div className="btn-floating halfway-fab waves-effect waves-light green">
              <i className="material-icons"></i>
            </div>
          </div>
          <div className="card-content">
            <h4 className="card-title">John Smith, 20 Y/O</h4>
            <p>
              I am a very simple card. I am good at containing small bits of information. I am
              convenient because I require little markup to use effectively.
            </p>
          </div>
          <div id="row">
            <div id="buttons">
              <button id="dislike" className="waves-effect waves-light btn red" tab-index="1">
                <span className="dislike-emoji">Nope</span>
              </button>
              <button id="letter" className="waves-effect waves-light btn orange" tab-index="2">
                <span className="fa fa-instagram">Message</span>
              </button>
              <button id="like" className="waves-effect waves-light btn green" tab-index="1">
                <span className="like-emoji">Yep</span>
              </button>
            </div>
          </div>
          {/* {userId ? (<VideoCall/>):(null)} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
