import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function EditServicePage() {
  const {carId, serviceId} = useParams();

  const [serviceDate, setServiceDate] = useState('');
  const [serviceDetails, setServiceDetails] = useState('');
  const [serviceStatus, setServiceStatus] = useState('');
  const [status, setStatus] = useState('idle');

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
      setServiceStatus(serviceFound.serviceStatus)
    })
    .catch(error => console.log('There was an error getting the car information from the database', error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading')
 
     const newServiceDetails = {
       serviceDate,
       serviceDetails,
       serviceStatus
     }

     axios.put(`${process.env.REACT_APP_API_URL}/cars/${carId}/${serviceId}`, newServiceDetails, {headers: {Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id}})
      .then(() => {
        setServiceDate('');
        setServiceDetails('');
        setServiceStatus('');
        setStatus('idle');
        navigate(`/home/cars/${carId}/${serviceId}`)
      })
      .catch(error => {
        console.log('There was an error editing the service details.', error)
      });
    }

  return (
    <Row className='col-12 mt-3'>
    <Col className='col-3'></Col>
    <Col className='col-6' style={{backgroundColor: "#f2f2f2"}}>
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

        <Form.Select name='serviceStatus' className='mb-3' aria-label="Default select example" onChange={(e) => {e.target.value && setServiceStatus(e.target.value)}}>
            <option>Select Service Status</option>
            <option value="Waiting">Waiting</option>
            <option value="On Shop">On Shop</option>
            <option value="Ready To Deliver">Ready To Deliver</option>
            <option value="Delivered">Delivered</option>
        </Form.Select>

        <Button className='mb-3' variant="danger" type="submit">
          Submit
        </Button> {status === 'loading' && <Spinner animation="border" variant="danger" />}
      </Form>
    </Col>
    <Col className='col-3'></Col>
    </Row>
  );
}

export default EditServicePage