import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
       
          {/* <Button onClick={() => setOpen(true)}>Get Started</Button> */}
          <Modal
            open={isOpen}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}
