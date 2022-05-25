import axios from 'axios';
import React, { useState } from 'react'
import { Alert, Col, Container, Form, Row, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = {email, password};

    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
        .then(response => navigate('/login'))
        .catch((error) => {
            const errorDescription = error.response.data.message;
            console.log("Error creating account", errorDescription)
            setErrorMessage(errorDescription);
        })
}


  return (
<Container fluid>
      <Row className="align-items-center" style={{ height: "100vh" }}>
        <Col>
            <h1>Welcome</h1>
            <p>Placeholder Text</p>
        </Col>
        <Col className="d-flex justify-content-center align-items-center" style={{ minHeight: "55vh", maxHeight: "auto"}}>
          <Form onSubmit={handleSignupSubmit} className="d-flex flex-column justify-content-center align-items-center" style={{ width: "35vw", minHeight: "55vh", maxHeight: "auto", backgroundColor: "#8AA29E", borderRadius: "25px"}}>
            <h1 className="mb-2 mt-2">Please Register</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {errorMessage && <Alert key={'danger'} variant={'danger'}>{errorMessage}</Alert>}
              <Form.Label>Email address</Form.Label>
              <Form.Control style={{ width: "20vw"}} type="email" name="email" value={email} required={true} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control style={{ width: "20vw"}} type="password" name="password" value={password} required={true} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
            <p className="mt-4">Already have an account? <Link to={"/login"}>Login</Link></p>
          </Form>

        </Col>
      </Row>
    </Container>
  )
}

export default SignupPage