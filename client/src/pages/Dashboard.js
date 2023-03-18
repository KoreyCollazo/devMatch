import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Dashboard = ({images}) => {

  // const { profileId } = useParams();

  // // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  // const { loading, data } = useQuery(profileId ? QUERY_SINGLE_PROFILE : QUERY_ME, {
  //   variables: { profileId: profileId }
  // });

  // // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  // const profile = data?.me || data?.profile || {};

  // // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
  //   return <Navigate to="/me" />;
  // }

  // if (loading) {
  //   return (
  //     <div class="preloader-wrapper big active">
  //       <div class="spinner-layer spinner-blue">
  //         <div class="circle-clipper left">
  //           <div class="circle"></div>
  //         </div>
  //         <div class="gap-patch">
  //           <div class="circle"></div>
  //         </div>
  //         <div class="circle-clipper right">
  //           <div class="circle"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!profile?.name) {
  //   return (
  //     <div className="row">
  //       <div className="col s2 m12">
  //         <div className="card">
  //           <div className="card-content">
  //             <h4>You need to be logged in to see your profile page.</h4>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  const imgUrls = [
    "https://media.cdn.adultswim.com/uploads/20220927/thumbnails/2_229271558509-RickAndMorty_607_DeSmithation.png", 
    "https://images.immediate.co.uk/production/volatile/sites/3/2022/09/6053-19a90fb.jpg?quality=90&resize=980,654"
  ]

  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.cdn.adultswim.com/uploads/20220927/thumbnails/2_229271558509-RickAndMorty_607_DeSmithation.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.immediate.co.uk/production/volatile/sites/3/2022/09/6053-19a90fb.jpg?quality=90&resize=980,654"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}


export default Dashboard;
