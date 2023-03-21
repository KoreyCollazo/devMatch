import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import 'react-datepicker/dist/react-datepicker.css';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

// hey yulia added more parameters, names and gender
const AboutMe = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    password: ''
  });
  const [addProfile, { error, data }] = useMutation(ADD_USER);

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

  // update state based on form input changes
  const handleChange = (event) => {
    const { firstName, value } = event.target;
    const { age, dateValue } = event.target;

    setFormState({
      ...formState,
      [firstName]: value,
      [age]: dateValue
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addProfile({
        variables: { ...formState } && console.log('Successfully created account')
      });

      Auth.login(data.addProfile.token);
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
                  type="submit">
                  Upload Image
                </button>
                <div>
                  <div className="row">
                    <form className="col s12" onSubmit={handleFormSubmit}>
                      <div class="container">
                        <div class="row">
                          <form class="col s12" id="reg-form">
                            <div class="row">
                              <div class="input-field col s6">
                                <input id="first_name" type="text" class="validate" required />
                                <label for="first_name">First Name</label>
                              </div>
                              <div class="input-field col s6">
                                <input id="last_name" type="text" class="validate" required />
                                <label for="last_name">Last Name</label>
                              </div>
                            </div>
                            <div class="row">
                              <div class="input-field col s12">
                                <input id="email" type="email" class="validate" required/>
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
                              
                                />
                                <label for="password">Password</label>
                              </div>
                            </div>
                      
                          </form>
                        </div>
                
                      </div>

                     

                      <DatePicker selected={dateValue} onChange={(date) => setDateValue(date)} />
                      <span className="helper-text" data-error="wrong" data-success="right">
                        DOB
                      </span>

                      <Select options={optionsGender} />

                      <span
                        name="gender"
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                        type="select"
                        value={formState.gender}
                        onChange={handleChange}>
                        Select your gender
                      </span>

                      <Select options={optionsEdu} />

                      <span
                        name="education"
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                        value={formState.education}
                        onChange={handleChange}>
                        Select your education
                      </span>

                      <input
                        type="text"
                        id="autocomplete-input"
                        className="autocomplete"
                        value={formState.location}
                        onChange={handleChange}
                      />
                      <label for="autocomplete-input">Enter your location</label>

                      <input
                        type="text"
                        id="autocomplete-input"
                        className="autocomplete"
                        value={formState.height}
                        onChange={handleChange}
                      />
                      <label for="autocomplete-input">Enter your height</label>

                      <input
                        type="text"
                        id="autocomplete-input"
                        className="autocomplete"
                        value={formState.ethnicity}
                        onChange={handleChange}
                      />
                      <label for="autocomplete-input">Enter your ethnicity</label>

                      <form className="col s12">
                        <div className="row">
                          <div className="input-field col s12">
                            <textarea
                              id="textarea2"
                              className="materialize-textarea"
                              data-length="120"></textarea>
                            <label for="autocomplete-input">Bio</label>
                          </div>
                        </div>
                      </form>

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
