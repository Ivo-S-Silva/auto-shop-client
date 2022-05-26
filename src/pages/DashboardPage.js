import React from "react";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import clientListImage from "../assets/images/client-list-image.jpg";
import carListImage from "../assets/images/car-list-image.jpg";
import serviceListImage from "../assets/images/service-list-image.jpg";
import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <Container style={{width: "100vw", backgroundColor: "#f2f2f2"}}>
    <Row>
      <h1 className="fw-bold pt-4">Auto-Shop Management</h1>
    </Row>
    <Row style={{height: "82vh"}} className='d-flex align-items-center justify-content-evenly'>
      <Col>
        <Card>
          <Card.Img
            variant="top"
            src={clientListImage}
          />
          <Card.Body style={{backgroundColor: "#dc3444"}}>
            <Link to='/home/clients' className='text-white' style={{textDecoration: "none"}} variant="primary">Client List</Link>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Img
            variant="top"
            src={carListImage}
          />
          <Card.Body style={{backgroundColor: "#dc3444"}}>
            <Link to='/home/cars/list' className='text-white' style={{textDecoration: "none"}} variant="primary">Car List</Link>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Img
            variant="top"
            src={serviceListImage}
          />
          <Card.Body style={{backgroundColor: "#dc3444"}}>
            <Link to='/home/services' className='text-white' style={{textDecoration: "none"}} variant="primary">Service List</Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </Container>
  );
}

export default DashboardPage;
