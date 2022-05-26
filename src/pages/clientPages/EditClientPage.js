import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function EditClientPage(props) {

  const {clientId} = useParams();

  const [clients, fetchClientList] = useOutletContext();
  const { user } = useContext(AuthContext);
  const clientDetails = clients.find(client => client._id === clientId);

  const [name, setName] = useState(clientDetails.name);
  const [fiscalNumber, setFiscalNumber] = useState(clientDetails.fiscalNumber);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
   e.preventDefault();

    const newClientDetails = {
      name,
      fiscalNumber
    }

    const storedToken = localStorage.getItem('authToken');


    axios.put(`${process.env.REACT_APP_API_URL}/clients/${clientId}`, newClientDetails, {headers: {Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id}})
      .then(response => {
        navigate(`/home/clients/${clientId}`);
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log('There was an error editing client information', errorDescription);
        setErrorMessage(errorDescription);
      });
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

  <Button variant="danger" type="submit">
    Submit
  </Button>
</Form>
  )
}

export default EditClientPage