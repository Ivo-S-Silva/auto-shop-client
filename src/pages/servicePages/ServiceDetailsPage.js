import axios from "axios";
import { Tab } from "bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row, Tabs } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function ServiceDetailsPage() {
  const { carId, serviceId } = useParams();

  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  const [service, setService] = useState(null);
  const [car, setCar] = useState(null);
  const [client, setClient] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          CurrentUserId: user._id,
        },
      })
      .then((response) => {
          setCar(response.data);
          const serviceFound = response.data.services.find(
          (service) => service._id == serviceId);
          setService(serviceFound);
        return axios.get(`${process.env.REACT_APP_API_URL}/clients/${response.data.owner}`, {headers: { Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id }})
      })
      .then(response => {
        setClient(response.data)
      })
      .catch((error) =>
        console.log(
          "There was an error getting the car information from the database.",
          error
        )
      );
  }, []);

const deleteService = () => {
  axios.delete(`${process.env.REACT_APP_API_URL}/cars/${car._id}/${service._id}`, {
    headers: { Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id }
  })
  .then(() => {
    navigate(`/home/cars/${car._id}`)
  })
  .catch(error => console.log('There was an error removing the service from the database.', error))
}


  return (
    <>
      <h1>Service</h1>
      <Tabs
        defaultActiveKey="service"
        id="uncontrolled-tab-example"
        className="d-flex justify-content-center"
      >
        <Tab eventKey="service" title="Service Details" >
          
        {!service ? (
            <h1>Loading service Information</h1>
          ) : (
            <Card className="mt-5">
            <div className="mt-4 d-flex justify-content-center ">
              <Button style={{width: "12vw"}} variant="danger"><Link className='text-light' style={{textDecoration: "none"}} to={`/home/cars/${car._id}/${service._id}/edit-service`}>Edit Service</Link></Button>
              <div style={{width: '5vw'}}></div>
              <Button style={{width: "12vw"}} variant="outline-danger" onClick={() => {deleteService(service._id)}}>Delete Service</Button>
            </div>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <h2>Service Description</h2>
                <Card.Title>Service Date: 
                  {service.serviceDate.substr(0,service.serviceDate.indexOf("T"))}
                </Card.Title>
                <Card.Title>Service Status: 
                  {service.serviceStatus}
                </Card.Title>
                <Card.Text className="mt-5 d-flex justify-content-center" style={{width: '50vw', whiteSpace: 'pre-line'}}>
                {service.serviceDetails}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Tab>
        <Tab eventKey="owner" title="Owner" >
        {!client ? <h1>Loading Client Information</h1> : 
          <Card className='border' style={{width: "100vw"}}>
            <Card.Body>
              <Card.Title>Client Name: {client.name}</Card.Title>
              <Card.Text>Fiscal Number: {client.fiscalNumber}</Card.Text>
              <Row>
                <Col>
                  <Button style={{width: "12vw"}} variant="danger"><Link className='text-light' style={{textDecoration: "none"}} to={`/home/clients/${client._id}`}>Go To Client Page</Link></Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>}
        </Tab>
        <Tab eventKey="car" title="Car">
        {!car ? <h1>Loading Car Information</h1> : 
          <Card className=' pt-3 border-bottom d-flex align-items-center' style={{width: "100vw"}}>
            <Card.Img variant="top" style={{width: "50vw"}} src={`${car.imageUrl}`}/>
            <Card.Body>
              <Card.Title>{car.brand} {car.model}</Card.Title>
              <Card.Text>License Plate: {car.licensePlate}</Card.Text>
              <Row>
                <Col>
                  <Button style={{width: "12vw"}} variant="danger"><Link className='text-light' style={{textDecoration: "none"}} to={`/home/cars`}>Go To Car List</Link></Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>}
        </Tab>
      </Tabs>
    </>
  );
}

export default ServiceDetailsPage;
