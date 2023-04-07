import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './NavBar.css';

function NavBar() {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#profile">My profile</a></li>
          <li><a href="#activities">Activities</a></li>
          <li><a href="#buddySearch">Buddy Search</a></li>
          <li><a href="#messages">Messages</a></li>
          <li><a href="#places">Places</a></li>
          <li><a href="#requests">Requests</a></li>
        </ul>
      </nav>
      <footer>
        <p >Website created by: Tina & Andrei</p>
        <a href="https://github.com/your-username"><FaGithub/></a>
        <a href="https://linkedin.com/in/your-username"><FaLinkedin/></a>
        <a href="mailto:youremail@example.com"><FaEnvelope/></a>
      </footer>
    </>
  );
}

export default NavBar;