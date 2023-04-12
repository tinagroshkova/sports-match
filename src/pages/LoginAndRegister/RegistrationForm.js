import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../components/../LoginAndRegister/LoginAndRegister.scss";
import userManager from "../../services/UserManager";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!username) {
      errors.username = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (!/\d/.test(password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter";
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length === 0) {
      try {
        await userManager.registerUser(username, password);
        alert("Registration successful!");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
        navigate("/login");
      } catch (error) {
        alert(error);

      }
    } else {
      setErrors(errors);
    }
  }
  return (
    <div className="loginPageHolder">
      <section>
        <form className="registrationForm" onSubmit={handleSubmit}>
          <h2 className="registerTitle">Register</h2>

          <Form.Group controlId="username">
            <div className="inputBox">
              <span className="icon"><ion-icon name="person"></ion-icon></span>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                isInvalid={!!errors.username}
                required
              />
              <label>Username</label>
            </div>
          </Form.Group>

          <Form.Group controlId="password">
            <div className="inputBox">
              <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                required
              />
              <label>Password</label>
            </div>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <div className="inputBox">
              <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                required
              />
              <label>Confirm Password</label>
            </div>
          </Form.Group>

          <Form.Control.Feedback className="text-danger" type="invalid">{errors.username}</Form.Control.Feedback>
          <Form.Control.Feedback className="text-danger" type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          <Form.Control.Feedback className="text-danger" type="invalid">{errors.password}</Form.Control.Feedback>

          <Button className="btn-primary" type="submit">Register</Button>
          <div className="registerLink">
            <p className="haveAnAcount">Already have an account?
              <Link to="/login"><span className="registerHover"> Log in</span></Link></p>
          </div>
        </form>
      </section>
    </div>
  );
}
export default RegistrationForm;
