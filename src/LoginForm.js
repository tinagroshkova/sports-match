import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

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
          <div>
            <p>Logged in as {loggedUser.username}</p>
            <Button variant="primary" onClick={this.handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Form className="loginForm" onSubmit={this.handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formUsername">
              <Col sm="10">
                <Form.Control type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
                {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPassword">
              <Col sm="10">
                <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
                {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                {errors.general && <Form.Text className="text-danger">{errors.general}</Form.Text>}
              </Col>
              <a href="#">Don't have an account yet?</a>
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        )}
      </div>
    );
  }
}

export default LoginForm;

