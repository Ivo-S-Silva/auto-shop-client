import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

function AddCarPage() {
    const {clientId} = useParams();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('')

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
   e.preventDefault();

    const newCar = {
      brand,
      model,
      licensePlate
    }

    const storedToken = localStorage.getItem('authToken');


    axios.post(`${process.env.REACT_APP_API_URL}/clients/${clientId}/cars`, newCar, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        setBrand('');
        setModel('');
        setLicensePlate('');
        navigate(`/clients/${clientId}`);
      })
      .catch(error => console.log('There was an error creating new car', error));
  }

  return (
    <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicBrand">
    <Form.Label>Brand:</Form.Label>
    <Form.Control required={true} type="text" name='brand' value={brand} placeholder="Enter brand name" onChange={e => {setBrand(e.target.value)}}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicModel">
    <Form.Label>Model:</Form.Label>
    <Form.Control required={true} name='model' value={model} type="text" placeholder="Enter model name" onChange={e => {setModel(e.target.value)}} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicLicensePlate">
    <Form.Label>License Plate:</Form.Label>
    <Form.Control required={true} name='licensePlate' value={licensePlate} type="text" placeholder="Enter license plate" onChange={e => {setLicensePlate(e.target.value)}} />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
  )
}

export default AddCarPage;