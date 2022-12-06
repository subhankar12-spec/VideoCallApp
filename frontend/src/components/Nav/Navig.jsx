import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/userActions';
import { LinkContainer } from 'react-router-bootstrap';

const Navig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          {isAuthenticated ? (
            <LinkContainer to="/protected">
              <Navbar.Brand>Meetly</Navbar.Brand>
            </LinkContainer>
          ) : (
            <LinkContainer to="/">
              <Navbar.Brand>Meetly</Navbar.Brand>
            </LinkContainer>
          )}
          <Nav className="me-auto w-100 justify-content-end">
            {!isAuthenticated ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <NavDropdown title={user.name} id="nav-dropdown">
                <NavDropdown.Item
                  eventKey="4.2"
                  onClick={() => logoutHandler()}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navig;
