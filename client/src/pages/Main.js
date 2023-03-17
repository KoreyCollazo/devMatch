import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';

export default function Main() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="section no-pad-bot" id="index-banner">
      <div className="container">
        <h3 className="header center orange-text">Connecting hearts and code</h3>
        <div className="row center">
          <h5 className="header col s12 light">Dating app for software developers</h5>
        </div>
        <div className="center-align">
          <>
            <div class="container">
              <div class="section">
                <div class="row">
                  <div class="col s12 m4">
                    <div class="icon-block">
                      <h2 class="center"> 😴</h2>
                      <h6 class="light">
                        Are you tired of swiping through countless profiles of people who don't
                        share your passion for coding and tech?
                      </h6>
                    </div>
                  </div>
                  <div class="col s12 m4">
                    <div class="icon-block">
                      <h2 class="center">👥</h2>
                      <h6 class="light">
                        Join our community of like-minded individuals who understand the joys and
                        challenges of working in the tech industry.
                      </h6>
                    </div>
                  </div>
                  <div class="col s12 m4">
                    <div class="icon-block">
                      <h2 class="center">💖</h2>
                      <h6 class="light">
                        So why wait? Sign up now and start connecting with other software engineers
                        who share your interests, goals, and values.
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

          <button class="waves-effect waves-light btn-large" onClick={() => setOpen(true)}>
            Get Started
          </button>
          <Modal
            id="modal"
            open={isOpen}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form class="col s14 signup-modal">
              <h4>Sign up</h4>
              <div class="row">
                <div class="input-field hoverable col s6">
                  <input id="firstName" type="text" class="validate" />
                  <label for="firstName">First Name</label>
                </div>
                <div class="input-field hoverable col s6">
                  <input id="lastName" type="text" class="validate" />
                  <label for="lastName">Last Name</label>
                </div>
                <div class="input-field hoverable col s6">
                  <input id="age" type="text" class="validate" />
                  <label for="age">Age</label>
                </div>
                <div class="input-field hoverable col s6">
                  <input id="gender" type="text" class="validate" />
                  <label for="gender">Gender</label>
                </div>
                <div class="input-field hoverable col s6">
                  <input id="preference" type="text" class="validate" />
                  <label for="preference">Preference</label>
                </div>
                <div class="input-field hoverable col s6">
                  <input id="email" type="email" class="validate" />
                  <label for="email">Email</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field hoverable col s6">
                  <input id="password" type="password" class="validate" />
                  <label for="password">Password</label>
                </div>
                <div class="input-field hoverable col s6">
                  <input id="password2" type="password" class="validate" />
                  <label for="password2">Retype Password</label>
                </div>
                <Link class="waves-effect waves-light btn right hoverable register" to="/about">
                  register
                </Link>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
