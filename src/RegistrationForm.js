import React from 'react';
import { Form } from 'react-bootstrap';
import './register.css';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, confirmPassword } = this.state;
    const errors = {};

    if (!username) {
      errors.username = 'Username is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    } else if (!/\d/.test(password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      // Proceed with registration logic
      const registrationData = { username, password };
      const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
      localStorage.setItem('registrations', JSON.stringify([...registrations, registrationData]));

      alert('Registration successful!');
      this.setState({
        username: '',
        password: '',
        confirmPassword: '',
        errors: {}
      });
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { username, password, confirmPassword, errors } = this.state;

    return (

      <section>
              <form className="registrationForm" onSubmit={this.handleSubmit}>
                <h2 className="registerTitle">Register</h2>
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

                 <div className="inputBox">
                  <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                  <input type="password" name="confirmPassword" value={confirmPassword} required onChange={this.handleChange}></input>
                  <label>Confirm Password</label>
                </div>

                {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>}

                <button className="btn-primary" type="submit">Register</button>
                
                <div className="registerLink">
                  <p className='haveAnAcount'>Already have an account? <a className="registerRedirect" href="#"><span
                    className="registerHover">Login</span></a></p>
                </div>
              </form>
          </section>
    );
  }
}

export default RegistrationForm;
