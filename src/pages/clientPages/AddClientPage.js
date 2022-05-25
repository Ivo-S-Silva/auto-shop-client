import axios from 'axios';
import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate, useOutletContext } from 'react-router-dom';

function AddClientPage(props) {

  const [name, setName] = useState('');
  const [fiscalNumber, setFiscalNumber] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [clients, fetchClientList] = useOutletContext();
  

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
   e.preventDefault();

    const newClient = {
      name,
      fiscalNumber
    }

    const storedToken = localStorage.getItem('authToken');


    axios.post(process.env.REACT_APP_API_URL + '/clients', newClient, {headers: {Authorization: `Bearer ${storedToken}`}})
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
    <Form onSubmit={handleSubmit}>
     {errorMessage && <Alert key={'danger'} variant={'danger'}>{errorMessage}</Alert>}
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Name:</Form.Label>
    <Form.Control required={true} type="text" name='name' value={name} placeholder="Enter client name" onChange={e => {setName(e.target.value)}}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Fiscal Number</Form.Label>
    <Form.Control required={true} name='fiscalNumber' value={fiscalNumber} type="Number" placeholder="Fiscal Number" onChange={e => {setFiscalNumber(e.target.value)}} />
  </Form.Group>

  <Button variant="secondary" type="submit">
    Submit
  </Button>
</Form>
  )
}

export default AddClientPage