import React from "react";
import "../NavBar/NavBar.scss";
import "../../index.scss";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../../pages/Home/Home";
import ProfilePage from "../../pages/Profile/Profile";
import ActivitiesPage from "../../pages/Activities/Activities";
import BuddySearchPage from "../../pages/BuddySearch/BuddySearch";
import MessagesPage from "../../pages/Messages/Messages";
import PlacesPage from "../../pages/Places/Places";
import LoginForm from "../../pages/LoginAndRegister/LoginForm";
import RegistrationForm from "../../pages/LoginAndRegister/RegistrationForm";
import { useLocation } from "react-router-dom";
import userManager from "../../services/UserManager";

function NavBar() {
  const location = useLocation();
  const hideNav = location.pathname === "/home" || location.pathname === "/login" || location.pathname === "/register";
  const hideButton = location.pathname !== "/home";
  return (
    <>
      {/* {hideButton ? null : (
        <div className="logoutContainer">
          <button className="" onClick={userManager.logoutUser}>Logout</button>
        </div>
      )
      } */}

      {hideNav ? null : (
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/profile">My profile</Link></li>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/buddySearch">Buddy Search</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/places">Places</Link></li>
            <div className="logoutContainer">
              <button className="lougOutBtnHeader" onClick={userManager.logoutUser}>Logout</button>
            </div>
          </ul>
        </nav>
      )}

      <Routes>
        <Route index element={<Navigate to={"/home"} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/buddySearch" element={<BuddySearchPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="*" element={<><h2 style={{ color: "white", display: "flex", justifyContent: "center" }}>Спечели си error трофей! Винаги може да се върнеш за още.</h2>
          <div className="errorImage">
            <img src="https://shorturl.at/zBG01" alt="errorImage"></img></div></>} />
      </Routes>

      <footer>
        <p >Website created by: Tina & Andrei</p>
        <a href="https://github.com/your-username"><FaGithub /></a>
        <a href="https://linkedin.com/in/your-username"><FaLinkedin /></a>
        <a href="mailto:youremail@example.com"><FaEnvelope /></a>
      </footer>
    </>
  );
}

export default NavBar;
