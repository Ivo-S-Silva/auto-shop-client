import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function AddClientPage(props) {

  const [name, setName] = useState('');
  const [fiscalNumber, setFiscalNumber] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [clients, fetchClientList] = useOutletContext();
  const { user } = useContext(AuthContext);
  

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
   e.preventDefault();

    const newClient = {
      name,
      fiscalNumber
    }

    const storedToken = localStorage.getItem('authToken');


    axios.post(process.env.REACT_APP_API_URL + '/clients', newClient, {headers: {Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id}})
      .then(response => {
        fetchClientList();
        setName('');
        setFiscalNumber(null);
        navigate(`/home/clients`);
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("There was an error creating the new client.", errorDescription);
        setErrorMessage(errorDescription);
      });
  }

  return (
    <Row className="col-12 mt-3">
      <Col className="col-3"></Col>
      <Col className="col-6" style={{backgroundColor: "#f2f2f2"}}>
        <Form onSubmit={handleSubmit}>
        <Form.Text><h1 className='mb-4 mt-4'>Add Client Information</h1></Form.Text>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              required={true}
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFiscalNumber">
            <Form.Label>Fiscal Number</Form.Label>
            <Form.Control
              required={true}
              name="fiscalNumber"
              value={fiscalNumber}
              type="Number"
              onChange={(e) => {
                setFiscalNumber(e.target.value);
              }}
            />
          </Form.Group>

          <Button className='mb-3' variant="danger" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
      <Col className="col-3"></Col>
    </Row>
  )
}

export default AddClientPage