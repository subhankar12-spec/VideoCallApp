import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const IntervieweeRegister = () => {
  const loginInitialValues = {
    email: '',
    password: '',
  };
  const [logIn, setLogIn] = useState(loginInitialValues);
  const onValueChange = (e) => {
    setLogIn({ ...logIn, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h5 className="mx-5 mt-5 text-center">Register</h5>
      <Form className="mx-5 mt-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="email" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Company</Form.Label>
          <Form.Control type="email" placeholder="Enter Company" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default IntervieweeRegister;
