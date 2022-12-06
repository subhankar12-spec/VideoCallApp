import React from 'react';
import './HomeStyles.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="body">
      <div className="main-container">
        <h1>Hi...</h1>
        <div className="buttonGroup">
          <Link to="/registerPage">
            <Button variant="primary" size="lg">
              Are You An Interviewer?
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Are You An Interviewee?
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
