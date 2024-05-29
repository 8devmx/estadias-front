import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo-travel.svg" alt="" />
      </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#packages">Packages</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
