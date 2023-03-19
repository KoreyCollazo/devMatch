import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import 'react-datepicker/dist/react-datepicker.css';

const Settings = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <div className="row center">
        <h4>User Profile Settings</h4>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <div className="upload-image"></div>
        </div>
        <button className="waves-effect waves-light btn">Upload Image</button>
      </div>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input id="first_name" type="text" className="validate" />
              <label for="first_name">First Name</label>
            </div>
            <div className="input-field col s6">
              <input id="last_name" type="text" className="validate" />
              <label for="last_name">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              <span className="helper-text" data-error="wrong" data-success="right">
                DOB
              </span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" className="validate" />
              <label for="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate" />
              <label for="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div class="input-field col s12">
              <Select options={options} />
              <span className="helper-text" data-error="wrong" data-success="right">
                Select Options
              </span>
            </div>
          </div>
        </form>
        <div className="row">
          <button className="waves-effect waves-light btn">Update</button>
      </div>
      </div>
    </>
  );
};

export default Settings;
