import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './LoginPage.css';
const LoginPage = () => {
  const loginInitialValues = {
    email: '',
    password: '',
  };
  const [logIn, setLogIn] = useState(loginInitialValues);
  const onValueChange = (e) => {
    setLogIn({ ...logIn, [e.target.name]: e.target.value });
  };
  return (
    <div className="body">
      <div className="main-container">
        <Card>
          <Card.Title className="text-center mt-3">Login</Card.Title>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => onValueChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => onValueChange(e)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
