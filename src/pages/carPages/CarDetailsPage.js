import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { Link,  useOutletContext, useParams } from 'react-router-dom';

function CarDetailsPage() {

const {carId} = useParams();

const [show, setShow] = useState(false);
const [selectedCar, setSelectedCar] = useState(null);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [carList, getCarList, deleteCar, currentCar] = useOutletContext();

useEffect(() => {
  setSelectedCar(currentCar);
}, [carId, currentCar])

const renderCarDetails = (car) => {
  return (car ?
    <Container style={{height: "92.7vh", overflowY: "scroll"}}>
          <Card className='mt-5'>
            <Card.Img variant="top" src={`${car.imageUrl}`}/>
            <Card.Body>
              <Card.Title>{car.brand} {car.model}</Card.Title>
              <Card.Text>License Plate: {car.licensePlate}</Card.Text>
              <Row>
                <Col>
                  <Button style={{width: "12vw"}} variant="danger"><Link className='text-light' style={{textDecoration: "none"}} to={`/home/cars/${car._id}/edit`}>Edit Car Info</Link></Button>
                </Col>
                <Col>
                  <Button style={{width: "12vw"}} variant="danger" onClick={handleShow}>Services</Button>
                </Col>
                <Col>
                  <Button style={{width: "12vw"}} variant="outline-danger" onClick={() => {deleteCar(car._id)}}>Delete Car</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Row>
            <Col style={{width: '30vw'}}>
              <Modal.Title>Service List</Modal.Title>
            </Col>
            <Col>
              <Button variant="danger"><Link to={`/home/cars/${carId}/new-service`} className='text-light' style={{textDecoration: "none"}}>Add New Service</Link></Button>
            </Col>
            </Row>
            </Modal.Header>
            <Modal.Body>
            <ListGroup>
              {car.services ? car.services.map(service => {
                return(
                    <ListGroup.Item action href={`/home/cars/${car._id}/${service._id}`}>
                      <p>Service Date: {service.serviceDate.substr(0, service.serviceDate.indexOf('T'))}</p>
                      <p>Service Details: {service.serviceDetails.length > 60 ? service.serviceDetails.slice(0, 60) + "..." : service.serviceDetails}</p>
                      <p>Service Status: {service.serviceStatus}</p>
                    </ListGroup.Item>
                      )}) : <p>There are currently no services scheduled for this vehicle.</p> 
              }
            </ListGroup>
            </Modal.Body>
          </Modal>
    </Container> : <Spinner animation="border" variant="danger" />
  )
}

return renderCarDetails(selectedCar);
}

export default CarDetailsPage