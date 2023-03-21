import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Uploader } from 'uploader';

import 'react-datepicker/dist/react-datepicker.css';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
// init images var
var images;

// hey yulia added more parameters, names and gender
const AboutMe = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    photos: '',
    bio: ''
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const [dateValue, setDateValue] = useState(new Date());

  const optionsGender = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' },
    { value: 'non-binary', label: 'non-binary' }
  ];

  const optionsEdu = [
    { value: 'college', label: 'college' },
    { value: 'bootcamp', label: 'bootcamp' },
    { value: 'self-taught', label: 'self-taught' }
  ];

  function uploadFiles() {
    // API key for upload-io
    const uploader = Uploader({
      apiKey: 'public_FW25b2gBiUt9ZJeaMf76rGcekrMo'
    });

    uploader
      .open({
        maxFileCount: 10,
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp']
      })
      .then((files) => {
        if (files.length === 0) {
          alert('No files selected.');
        } else {
          images = files.map((f) => f.fileUrl);
          setFormState({
            ...formState,
            photos: images.toString()
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // age function from https://stackoverflow.com/users/17447/naveen
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
      age: getAge(dateValue),
      gender: document.getElementById('gender').textContent,
      education: document.getElementById('education').textContent
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    console.log(formState);
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
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <>
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                  onClick={() => {
                    uploadFiles();
                  }}>
                  Upload Image
                </button>
                <div>
                  <div className="row">
                    <form className="col s12" onSubmit={handleFormSubmit}>
                      <div class="container">
                        <div class="row">
                          <div class="col s12" id="reg-form">
                            <div class="row">
                              <div class="input-field col s6">
                                <input
                                  id="first_name"
                                  name="firstName"
                                  type="text"
                                  class="validate"
                                  required
                                  value={formState.firstName}
                                  onChange={handleChange}
                                />
                                <label for="first_name">First Name</label>
                              </div>
                              <div class="input-field col s6">
                                <input
                                  id="last_name"
                                  name="lastName"
                                  type="text"
                                  class="validate"
                                  required
                                  value={formState.lastName}
                                  onChange={handleChange}
                                />
                                <label for="last_name">Last Name</label>
                              </div>
                            </div>
                            <div class="row">
                              <div class="input-field col s12">
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  class="validate"
                                  required
                                  value={formState.email}
                                  onChange={handleChange}
                                />
                                <label for="email">Email</label>
                              </div>
                            </div>
                            <div class="row">
                              <div class="input-field col s12">
                                <input
                                  id="password"
                                  type="password"
                                  class="validate"
                                  minlength="6"
                                  required
                                  name="password"
                                  value={formState.password}
                                  onChange={handleChange}
                                />
                                <label for="password">Password</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <DatePicker selected={dateValue} onChange={(date) => setDateValue(date)} />
                      <span className="helper-text" data-error="wrong" data-success="right"></span>

                      <span
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                        type="select">
                        Select your gender
                      </span>

                      <Select options={optionsGender} id="gender" />

                      <span
                        name="education"
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                        value={formState.education}
                        onChange={handleChange}>
                        Select your education
                      </span>
                      <Select options={optionsEdu} id="education" />

                      <input
                        name="location"
                        type="text"
                        id="autocomplete-input"
                        className="autocomplete"
                        value={formState.location}
                        onChange={handleChange}
                      />
                      <label for="autocomplete-input">Enter your location</label>

                      <input
                        name="height"
                        type="text"
                        id="autocomplete-input"
                        className="autocomplete"
                        value={formState.height}
                        onChange={handleChange}
                      />
                      <label for="autocomplete-input">Enter your height</label>

                      <input
                        name="ethnicity"
                        type="text"
                        id="autocomplete-input"
                        className="autocomplete"
                        value={formState.ethnicity}
                        onChange={handleChange}
                      />
                      <label for="autocomplete-input">Enter your ethnicity</label>

                      <div className="col s12">
                        <div className="row">
                          <div className="input-field col s12">
                            <textarea
                              id="textarea2"
                              className="materialize-textarea"
                              data-length="120"
                              name="bio"
                              value={formState.bio}
                              onChange={handleChange}></textarea>
                            <label for="autocomplete-input">Bio</label>
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn btn-block btn-info"
                        style={{ cursor: 'pointer' }}
                        type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}

            {error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutMe;
