import React, { Component } from 'react';
import M from 'materialize-css';

import { Link } from 'react-router-dom';

class Cards extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center"> 😴</h2>

                  <h6 className="light">
                    Are you tired of swiping through countless profiles of people who don't share
                    your passion for coding and tech?
                  </h6>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center">👥</h2>

                  <h6 className="light">
                    Join our community of like-minded individuals who understand the joys and
                    challenges of working in the tech industry.
                  </h6>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center">💖</h2>

                  <h6 className="light">
                    So why wait? Sign up now and start connecting with other software engineers who
                    share your interests, goals, and values.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="center-align">
          <Link className="waves-effect waves-light btn-large" to="/signup">
            Sign up now
          </Link>
        </div>
      </>
    );
  }
}

export default Cards;
