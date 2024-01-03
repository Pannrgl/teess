import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleNavbar}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="brand">PannFlix</div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
