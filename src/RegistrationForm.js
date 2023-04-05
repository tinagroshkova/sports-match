import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

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
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
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
      <Form className='registrationForm' onSubmit={this.handleSubmit}>
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
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formConfirmPassword">
          <Col sm="10">
            <Form.Control type="password" name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={this.handleChange} />
            {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>}
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">Register</Button>
      </Form>
    );
  }
}

export default RegistrationForm;