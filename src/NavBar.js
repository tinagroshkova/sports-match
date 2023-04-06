import React from 'react';
import { COLORS } from './styleVariables';

const navHolderStyles = {
  backgroundColor: COLORS.mainColor,
  width: '100%',
  justifyContent: 'center',
  boxShadow: COLORS.boxShadow
}

const navStyles = {
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: COLORS.mainColor,
  width: '30%',
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

function NavBar() {
  return (
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
  );
}

export default NavBar;