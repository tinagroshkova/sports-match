import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { COLORS } from './styleVariables';

const navHolderStyles = {
  backgroundColor: COLORS.darkMainColor,
  width: '100%',
  justifyContent: 'center',
  boxShadow: COLORS.boxShadow
}

const navStyles = {
  display: 'flex',
  flexDirection: 'row',
  width: '800px',
  margin: 'auto',
  justifyContent: 'space-between',
  alignItems: 'center',
  listStyleType: 'none', 
  margin: '10px',
};

const linkStyles = {
  textDecoration: 'none', 
  color: COLORS.almostWhiteColor,
  fontSize: '20px',
  fontWeight: '300',
};

const firstLinkStyles = {
  fontWeight: '700',
};

const footerStyles = {
  backgroundColor: COLORS.darkMainColor,
  width: '100%',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  position: 'fixed',
  bottom: '0',
  padding: '20px',
  fontSize: '18px',
  boxShadow: '0 -8px 6px -6px black'
};

const iconStyles = {
  color: COLORS.almostWhiteColor,
  fontSize: '30px',
  margin: '5px',
};

function NavBar() {
  return (
    <>
      <nav className="navbar" style={navHolderStyles}>
        <ul className="nav-links" style={navStyles}>
          <li><a href="#home" style={{...linkStyles, ...firstLinkStyles}}>Home</a></li>
          <li><a href="#profile" style={linkStyles}>My profile</a></li>
          <li><a href="#messages" style={linkStyles}>Messages</a></li>
          <li><a href="#activities" style={linkStyles}>Activities</a></li>
          <li><a href="#places" style={linkStyles}>Places</a></li>
          <li><a href="#request" style={linkStyles}>Request</a></li>
        </ul>
      </nav>
      <footer style={footerStyles}>

        <p style={{ color: COLORS.almostWhiteColor, fontWeight: '300' }}>Website created by: Tina & Andrey</p>
        <a href="https://github.com/your-username"><FaGithub style={iconStyles} /></a>
        <a href="https://linkedin.com/in/your-username"><FaLinkedin style={iconStyles} /></a>
        <a href="mailto:youremail@example.com"><FaEnvelope style={iconStyles} /></a>
      </footer>
    </>
  );
}

export default NavBar;