import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { COLORS } from './styleVariables';
import './loginAndRegister.css';
import {} from "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      loggedUser: null
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogout = () => {
    const logoutPromise = new Promise((resolve) => {
      this.setState({ loggedUser: null }, resolve);
    });

    logoutPromise.then(() => {
      alert('Logout successful!');
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    const user = registrations.find((user) => user.username === username && user.password === password);
    const errors = {};

    const loginPromise = new Promise((resolve, reject) => {
      if (!user) {
        errors.general = 'Invalid username or password';
        reject(errors);
      } else {
        this.setState({ loggedUser: user }, resolve);
      }
    });

    loginPromise
      .then(() => {
        alert('Login successful!');
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };

  render() {
    const { username, password, errors, loggedUser } = this.state;

    return (
      <div>
        {loggedUser ? (
          <div className='userHolder'>
            <p>User: {loggedUser.username}</p>
            <Button variant="primary" onClick={this.handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <section>
              <form className="loginForm" onSubmit={this.handleSubmit}>
                <h2>Login</h2>
                <div className="inputBox">
                  <span className="icon"><ion-icon name="person"></ion-icon></span>
                  <input type="text" name="username" value={username} required onChange={this.handleChange}></input>
                  <label>Username</label>
                </div>
                
                {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}

                <div className="inputBox">
                  <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                  <input type="password" name="password" value={password} required onChange={this.handleChange}></input>
                  <label>Password</label>
                </div>

                {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                {errors.general && <Form.Text className="text-danger">{errors.general}</Form.Text>}

                <button className="btn-primary" type="submit">Login</button>
                <div className="registerLink">
                  <p className='noAccount'>Don't have an account? <a className="registerRedirect" href="#"><span
                    className="registerHover">Register</span></a></p>
                </div>
              </form>
          </section>
        )}
      </div>
    );
  }
}

export default LoginForm;