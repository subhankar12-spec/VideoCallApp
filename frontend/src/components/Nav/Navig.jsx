import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navig = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Meetly</Navbar.Brand>
          <Nav className="me-auto w-100 justify-content-end">
            <Nav.Link href="#home">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navig;
