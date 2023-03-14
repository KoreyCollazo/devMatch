import React, { useState } from "react";
import Modal from "@mui/material/Modal";
// import M from "materialize-css";

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
       
          <button class="waves-effect waves-light btn-large" onClick={() => setOpen(true)}>Get Started</button>
          <Modal
            open={isOpen}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
         
            
                <form class="col s14 signup-modal">
                <h4>Sign up</h4>
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
                  <a class="waves-effect waves-light btn right hoverable register" href="/">register</a>
                </div>
              </form>
       
         
          </Modal>
        </div>
      </div>
    </div>
  );
}
