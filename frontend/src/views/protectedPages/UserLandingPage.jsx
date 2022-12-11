import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UserLandingPage = () => {
  const startMeet = async () => {
    localStorage.setItem('meetname', meetname);
    if (meetname === '') {
      alert('Enter Meetname');
    } else {
      console.log(val, meetname);
      window.open(`/room?host=${true}`);
    }
  };
  const joinMeet = async () => {
    window.open(`${val}`);
  };
  const [val, setVal] = useState();
  const [meetname, setMeetName] = useState('');

  const handleChange = (event) => {
    setVal(event.target.value);
  };
  const handleMeetName = (event) => {
    setMeetName(event.target.value);
  };

  return (
    <div>
      Hello This is protected bro
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Meet</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Meetname"
            value={meetname}
            onChange={handleMeetName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="email"
            placeholder="Value"
            value={val}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="button" variant="primary" onClick={startMeet}>
          Create Meet
        </Button>
        <Button className="button" variant="primary" onClick={joinMeet}>
          Join Meet
        </Button>
      </Form>
    </div>
  );
};

export default UserLandingPage;
