import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        <h5>&copy; {new Date().getFullYear()} - Dream Team ❤️</h5>
      </div>
    </footer>
  );
};

export default Footer;
