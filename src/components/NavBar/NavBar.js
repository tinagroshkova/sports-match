import React from "react";
import "../NavBar/NavBar.scss";
import "../../index.scss";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../../pages/Home/Home";
import ProfilePage from "../../pages/Profile";
import ActivitiesPage from "../../pages/Activities/Activities";
import BuddySearchPage from "../../pages/BuddySearch";
import MessagesPage from "../../pages/Messages";
import PlacesPage from "../../pages/Places";
import RequestsPage from "../../pages/Requests";
import LoginForm from "../../pages/LoginAndRegister/LoginForm";
import RegistrationForm from "../../pages/LoginAndRegister/RegistrationForm";
import { useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/home" || location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
       {isHomePage ? null : (
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/profile">My profile</Link></li>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/buddySearch">Buddy Search</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/places">Places</Link></li>
            <li><Link to="/requests">Requests</Link></li>
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
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="*" element={<><h2 style={{ color: "red" }}>Спечели си error трофей! Винаги може да се върнеш за още.</h2>
          <div className="errorImage">
            <img width={200} src="https://media.istockphoto.com/id/1168757141/vector/gold-trophy-with-the-name-plate-of-the-winner-of-the-competition.jpg?s=612x612&w=0&k=20&c=ljsP4p0yuJnh4f5jE2VwXfjs96CC0x4zj8CHUoMo39E="></img></div></>} />
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
