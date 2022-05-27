import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function AddServicePage() {
    const {carId} = useParams();

  const [serviceDate, setServiceDate] = useState('');
  const [serviceDetails, setServiceDetails] = useState('');
  const [status, setStatus] = useState('idle');

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
   e.preventDefault();
   setStatus('loading')

    const newService = {
      serviceDate,
      serviceDetails
    }

    const storedToken = localStorage.getItem('authToken');


    axios.post(`${process.env.REACT_APP_API_URL}/cars/${carId}/services`, newService, {headers: {Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id}})
      .then(() => {
        setServiceDate('');
        setServiceDetails('');
        setStatus('idle')
        navigate(`/home/cars/${carId}`);
      })
      .catch(error => {
        console.log('There was an error creating new service', error)
      });
  }

  return (
    <Row className='col-12 mt-3'>
    <Col className='col-3'></Col>
    <Col className='col-6' style={{backgroundColor: "#f2f2f2"}}>
      <Form onSubmit={handleSubmit}>
      <Form.Text><h1 className='mb-4 mt-4'>Add New Service</h1></Form.Text>
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

        <Button className='mb-3' variant="danger" type="submit">
          Submit
        </Button> {status === 'loading' && <Spinner animation="border" variant="danger" />}
      </Form>
    </Col>
    <Col className='col-3'></Col>
    </Row>
  );
}

export default AddServicePage;