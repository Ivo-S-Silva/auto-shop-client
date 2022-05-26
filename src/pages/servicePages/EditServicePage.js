import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function EditServicePage() {
  const {carId, serviceId} = useParams();

  const [serviceDate, setServiceDate] = useState('');
  const [serviceDetails, setServiceDetails] = useState('');

  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/cars/${carId}`, {headers: { Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id }})
    .then(response => {
      const serviceList = response.data.services;
      const serviceFound = serviceList.find(service => service._id == serviceId);

      setServiceDate(serviceFound.serviceDate.substr(0, serviceFound.serviceDate.indexOf('T')))
      setServiceDetails(serviceFound.serviceDetails)
    })
    .catch(error => console.log('There was an error getting the car information from the database', error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
 
     const newServiceDetails = {
       serviceDate,
       serviceDetails
     }

     axios.put(`${process.env.REACT_APP_API_URL}/cars/${carId}/${serviceId}`, newServiceDetails, {headers: {Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id}})
      .then(() => {
        setServiceDate('');
        setServiceDetails('');
        return <Navigate to={`/home/cars/${carId}`}/>
      })
      .catch(error => {
        console.log('There was an error creating new service', error)
      });
    }

  return (
    <Row>
    <Col className='col-3'></Col>
    <Col className='col-6'>
      <Form onSubmit={handleSubmit}>
      <Form.Text><h1 className='mb-4 mt-4'>Edit Service</h1></Form.Text>
        <Form.Group className="mb-3" xs='auto' controlId="formBasicBrand">
          <Form.Label>Service Date:</Form.Label>
          <Form.Control
            required={true}
            type="date"
            name="brand"
            value={serviceDate}
            placeholder="Enter service date"
            onChange={(e) => {
              setServiceDate(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" xs='auto' controlId="formBasicModel">
          <Form.Label>Service Details:</Form.Label>
          <Form.Control
            required={true}
            name="model"
            value={serviceDetails}
            as="textarea"
            rows="10"
            placeholder="Enter service description"
            onChange={(e) => {
              setServiceDetails(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="danger" type="submit">
          Submit
        </Button>
      </Form>
    </Col>
    <Col className='col-3'></Col>
    </Row>
  );
}

export default EditServicePage