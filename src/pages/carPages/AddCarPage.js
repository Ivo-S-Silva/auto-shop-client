import axios from 'axios';
import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

function AddCarPage() {
  const {clientId} = useParams();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [image, setImage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [clients, fetchClientList] = useOutletContext();

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
   e.preventDefault();

    const storedToken = localStorage.getItem('authToken');

    const data = new FormData()
    data.append("file", image)  
    data.append("upload_preset", "standard")
    
    

    axios.post("  https://api.cloudinary.com/v1_1/dq8uzmgrq/image/upload", data, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
    .then(response => {

      const newCar = {
        brand,
        model,
        licensePlate,
        imageUrl: response.data.secure_url
      }

      return axios.post(`${process.env.REACT_APP_API_URL}/clients/${clientId}/cars`, newCar, {headers: {Authorization: `Bearer ${storedToken}`}})
    })
      .then(response => {
        setBrand('');
        setModel('');
        setLicensePlate('');
        fetchClientList();
        navigate(`/home/clients/${clientId}`);
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log('There was an error creating new car', errorDescription)
        setErrorMessage(errorDescription)
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
    {errorMessage && <Alert key={'danger'} variant={'danger'}>{errorMessage}</Alert>}
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

  <Form.Group className="mb-3" controlId="formBasicLicensePlate">
    <Form.Label>Image:</Form.Label>
    <Form.Control name='car-image' type="file" onChange={e => {setImage(e.target.files[0])}}/>
  </Form.Group>

  <Button variant="secondary" type="submit">
    Submit
  </Button>
</Form>
  )
}

export default AddCarPage;