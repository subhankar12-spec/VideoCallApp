import React from 'react';
import './HomeStyles.css';
import Button from 'react-bootstrap/Button';
const Homepage = () => {
  return (
    <div className="body">
      <div className="main-container">
        <h1>Hi...</h1>
        <div className="buttonGroup">
          <Button variant="primary" size="lg">
            Are You An Interviewer?
          </Button>
          <Button variant="secondary" size="lg">
            Are You An Interviewee?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
