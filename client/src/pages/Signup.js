import React, { Component } from 'react';
import M from "materialize-css";

class Signup extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div class="container col s8">
        <div class="row">
          <nav>
            <div class="nav-wrapper">
              <div class="col s8">
                <h3 class="brand-logo col s8">Sign up</h3>
              </div>
            </div>
          </nav>
  
        </div>
        <form class="col s14">
          <div class="row">
            <div class="input-field hoverable col s6">
              <i class="material-icons prefix">contacts</i>
              <input 
              id="first_name" 
              type="text"  
              class="validate" 
              />
              <label for="first_name">Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field hoverable col s6">
              <i class="material-icons prefix">account_circle</i>
              <input 
              id="username" 
              type="text" 
              class="validate"
              />
              <label for="username">Username</label>
            </div>
            <div class="input-field hoverable col s6">
              <i class="material-icons prefix">email</i>
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
              <i class="material-icons prefix">vpn_key</i>
              <input 
              id="password" 
              type="password" 
              class="validate"
              />
              <label for="password">Password</label>
            </div>
            <div class="input-field hoverable col s6">
              <i class="material-icons prefix">replay</i>
              <input id="password2" type="password" class="validate"/>
              <label for="password2">Retype Password</label>
            </div>
          </div>
          <a class="waves-effect waves-light btn right hoverable" href="/"><i class="large material-icons right">done</i>register</a>
        </form>
      </div>
    );
  }
};

export default Signup;
