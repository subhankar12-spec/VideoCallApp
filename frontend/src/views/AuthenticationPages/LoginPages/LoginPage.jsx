import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './LoginPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/userActions';
import { useNavigate, Navigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container } from 'react-bootstrap';
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const loginInitialValues = {
    email: '',
    password: '',
  };

  const [logIn, setLogIn] = useState(loginInitialValues);
  const onValueChange = (e) => {
    setLogIn({ ...logIn, [e.target.name]: e.target.value });
  };
  if (isAuthenticated) {
    return <Navigate to="/protected" />;
  }
  const loginUser = () => {
    console.log(logIn);
    dispatch(login(logIn.email, logIn.password));
  };

  return (
    <div className="body">
      <div className="main-container">
        {/* {isAuthenticated ? (
          <Navigate to="/protected" />
        ) : (
          <Navigate to="/login" />
        )} */}
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

              <Button
                className="button"
                variant="primary"
                onClick={() => loginUser()}
              >
                Submit
              </Button>
            </Form>
            {/* <LinkContainer to="/protected">
              <Button variant="primary">Hehe</Button>
            </LinkContainer> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
