import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

function EditClientPage(props) {

  const {clientId} = useParams();

  const clientDetails = props.clients.find(client => client._id === clientId);

  const [name, setName] = useState(clientDetails.name);
  const [fiscalNumber, setFiscalNumber] = useState(clientDetails.fiscalNumber);

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
   e.preventDefault();

    const newClientDetails = {
      name,
      fiscalNumber
    }

    const storedToken = localStorage.getItem('authToken');


    axios.put(`${process.env.REACT_APP_API_URL}/clients/${clientId}`, newClientDetails, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        props.callbackGetClientList();
        navigate(`/clients/${clientId}`);
      })
      .catch(error => console.log('There was an error creating new client', error));
  }

  return (
    <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Name:</Form.Label>
    <Form.Control required={true} type="text" name='name' value={name} onChange={e => {setName(e.target.value)}}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicFiscalNumber">
    <Form.Label>Fiscal Number</Form.Label>
    <Form.Control required={true} name='fiscalNumber' value={fiscalNumber} type="Number" onChange={e => {setFiscalNumber(e.target.value)}} />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
  )
}

export default EditClientPage