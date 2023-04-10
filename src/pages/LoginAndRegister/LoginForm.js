import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "../components/../LoginAndRegister/LoginAndRegister.scss";
import UserManager from "../../services/UserManager";
import { Link } from "react-router-dom";
import { } from "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"

import football from "../../images/football2.png";
import football1 from "../../images/football3.png";
import tennis from "../../images/tennis.png";
import basketball from "../../images/basketball.png";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleLogin = () => {
    return UserManager.loginUser(username, password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleLogin();
      window.location.reload(); // Refresh the page to reflect the login state
    } catch (err) {
      setErrors({ general: err.message });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const user = UserManager.getLoggedInUser();
    setCurrentUser(user);
  }, []);

  return (
    <>
      <img src={tennis} className="bannerImage1"></img>
      <img src={football} className="bannerImage2"></img>
      <img src={football1} className="bannerImage4"></img>
      <img src={basketball} className="bannerImage5"></img>
      <section>
        <form className="loginForm" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="inputBox">
            <span className="icon"><ion-icon name="person"></ion-icon></span>
            <input type="text" name="username" value={username} required onChange={handleChange}></input>
            <label>Username</label>
          </div>

          {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}

          <div className="inputBox">
            <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
            <input type="password" name="password" value={password} required onChange={handleChange}></input>
            <label>Password</label>
          </div>

          {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
          {errors.general && <Form.Text className="text-danger">{errors.general}</Form.Text>}

          <Button className="btn-primary" type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</Button>
          <div className="registerLink">
            <p className="haveAnAcount">Don"t have an account?
              <Link to="/register"> <span className="registerHover">Register</span></Link></p>
          </div>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
