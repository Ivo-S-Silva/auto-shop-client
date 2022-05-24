import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'

function EditCarPage(props) {
    const car = props.currentCar;

    const [brand, setBrand] = useState(car.brand);
    const [model, setModel] = useState(car.model);
    const [licensePlate, setLicensePlate] = useState(car.licensePlate);

    const storedToken = localStorage.getItem('authToken');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();

        const newCarDetails = {
            brand,
            model,
            licensePlate
        }

        axios.put(`${process.env.REACT_APP_API_URL}/cars/${car._id}`, newCarDetails, {headers: { Authorization: `Bearer ${storedToken}` }})
          .then((response) => {
            navigate(`/cars/${car._id}`);
          })
          .catch(error => console.log('There was an error updating the car details', error))
    }

  return (
    <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicBrand">
    <Form.Label>Brand:</Form.Label>
    <Form.Control required={true} type="text" name='brand' value={brand} onChange={e => {setBrand(e.target.value)}}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicModel">
    <Form.Label>Model</Form.Label>
    <Form.Control required={true} name='model' value={model} type="text" onChange={e => {setModel(e.target.value)}} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicLicensePlate">
    <Form.Label>License Plate</Form.Label>
    <Form.Control required={true} unique={true} name='license Plate' value={licensePlate} type="text" onChange={e => {setLicensePlate(e.target.value)}} />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
  )
}

export default EditCarPage