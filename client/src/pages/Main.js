import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Main() {
  const [isOpen, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    education: '',
    location: '',
    email: '',
    password: ''
  });
  const [addUser] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="section no-pad-bot" id="index-banner">
      <div className="container">
        <h3 className="header center orange-text">Connecting hearts and code</h3>
        <div className="row center">
          <h5 className="header col s12 light">Dating app for software developers</h5>
        </div>
        <div className="center-align">
          <>
            <div className="container">
              <div className="section">
                <div className="row">
                  <div className="col s12 m4">
                    <div className="icon-block">
                      <h2 className="center"> 😴</h2>
                      <h6 className="light">
                        Are you tired of swiping through countless profiles of people who don't
                        share your passion for coding and tech?
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
                        So why wait? Sign up now and start connecting with other software engineers
                        who share your interests, goals, and values.
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

          <button className="waves-effect waves-light btn-large" onClick={() => setOpen(true)}>
            Get Started
          </button>
          <Modal
            id="modal"
            open={isOpen}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <form onSubmit={handleFormSubmit}>
              <div className="col s12 signup-modal">
                <h4>Sign up</h4>
                <div className="row">
                  <div className="input-field hoverable col s12">
                    <input
                      className="form-input"
                      name="firstName"
                      type="text"
                      value={formState.firstName}
                      onChange={handleChange}
                    />
                    <label for="firstName">First Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field hoverable col s12">
                    <input
                      className="form-input"
                      name="lastName"
                      type="text"
                      value={formState.lastName}
                      onChange={handleChange}
                    />
                    <label for="lastName">Last Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field hoverable col s12">
                    <input
                      className="form-input"
                      name="age"
                      type="number"
                      value={formState.age}
                      onChange={handleChange}
                    />
                    <label for="age">Age</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field hoverable col s12">
                    <input
                      className="form-input"
                      name="gender"
                      type="text"
                      value={formState.gender}
                      onChange={handleChange}
                    />
                    <label for="gender">Gender</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field hoverable col s12">
                    <input
                      className="form-input"
                      name="location"
                      type="text"
                      value={formState.location}
                      onChange={handleChange}
                    />
                    <label for="location">Location</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field hoverable col s12">
                    <input
                      className="form-input"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                    <label for="email">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field hoverable col s12">
                    <input
                      className="form-input"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <label for="password">Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 center-align">
                    <button
                      className="waves-effect waves-light btn-large"
                      style={{ cursor: 'pointer' }}
                      type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
