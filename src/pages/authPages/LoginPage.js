import axios from "axios";
import React, { useContext, useState } from "react";
import {Navigate, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { Col, Container, Form, Row, Button } from "react-bootstrap";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    


    const requestBody = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/home')
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log("Error logging into your account", errorDescription);
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container fluid>
      <Row className="align-items-center" style={{ height: "100vh" }}>
        <Col>
            <h1>Welcome</h1>
            <p>Placeholder Text really cool</p>
        </Col>
        <Col className="d-flex justify-content-center align-items-center" style={{ height: "55vh"}}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Form onSubmit={handleLoginSubmit} className="d-flex flex-column justify-content-center align-items-center" style={{ width: "35vw", height: "55vh", backgroundColor: "#8AA29E", borderRadius: "25px"}}>
            <h1 className="mb-5">Please Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control style={{ width: "20vw"}} type="email" name="email" value={email} required={true} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control style={{ width: "20vw"}} type="password" name="password" value={password} required={true} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
            <p className="mt-4">Need an account? <Link to={"/signup"}>Sign Up</Link></p>
          </Form>

        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
