import React, { Component } from 'react';
import M from "materialize-css";

class Signup extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      
      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Sign up</h4>
          <form class="col s14">
          <div class="row">
            <div class="input-field hoverable col s6">
              <input 
              id="username" 
              type="text" 
              class="validate"
              />
              <label for="username">Username</label>
            </div>
            <div class="input-field hoverable col s6">
              <input 
              id="email" 
              type="email" 
              class="validate"
              />
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field hoverable col s6">
              <input 
              id="password" 
              type="password" 
              class="validate"
              />
              <label for="password">Password</label>
            </div>
            <div class="input-field hoverable col s6">
              <input id="password2" type="password" class="validate"/>
              <label for="password2">Retype Password</label>
            </div>
          </div>
          <a class="waves-effect waves-light btn right hoverable" href="/">register</a>
        </form>
        </div>
      </div>

    
  
        
   
    );
  }
};

export default Signup;
