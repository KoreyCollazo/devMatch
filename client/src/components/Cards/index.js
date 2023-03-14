import React, { Component } from 'react';
import M from "materialize-css";

import { Link } from 'react-router-dom';

class Cards extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <><div class="container">
        <div class="section">
          <div class="row">
            <div class="col s12 m4">
              <div class="icon-block">
                <h2 class="center"> 😴</h2>
                <h6 class="light">Are you tired of swiping through countless profiles of people who don't share your passion for coding and tech?</h6>
              </div>
            </div>
            <div class="col s12 m4">
              <div class="icon-block">
                <h2 class="center">👥</h2>
                <h6 class="light">Join our community of like-minded individuals who understand the joys and challenges of working in the tech industry.</h6>
              </div>
            </div>
            <div class="col s12 m4">
              <div class="icon-block">
                <h2 class="center">💖</h2>
                <h6 class="light">So why wait? Sign up now and start connecting with other software engineers who share your interests, goals, and values.</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
};

export default Cards;