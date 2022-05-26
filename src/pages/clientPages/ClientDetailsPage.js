import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function ClientDetailsPage() {
  const { clientId } = useParams();
  const [client, setClient] = useState({});

  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/clients/${clientId}`, {
      headers: { Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id },
    })
    .then((response) => setClient(response.data))
    .catch((error) => {
      console.log(
        "There was an error getting the client details from the database"
      );
    });
  }, [])
  
  const renderCarList = () => {
    return client.cars.map(car => {
      let carName = car.brand + " " + car.model;
      return(
        <tr>
          <td>
            <Link to={`/home/cars/${car._id}`}>{carName}</Link>
          </td>
          <td>
            {car.licensePlate}
          </td>
          <td>
            {car.services.length}
          </td>
        </tr>
      )
    })
  }

  return (
    <Row className="col-12 mt-3">
    <Col className="col-2"></Col>
    <Col className="col-8" style={{ backgroundColor: "#f2f2f2" }}>
    <>
      {!client ? (
        <h1>Loading...</h1>
      ) : (
        <>
        <Row className="mt-3">
        <Col>
          <h2>Name</h2>
          <h3>{client.name}</h3>
        </Col>
        <Col>
          <h2>Fiscal Number</h2>
          <h3>{client.fiscalNumber}</h3>
        </Col>
        </Row>
        <Button className='mt-4' variant="danger"><Link to={`/home/clients/${clientId}/edit`} className='text-light' style={{textDecoration: "none"}}>Edit Client Info</Link></Button>
          
          <Row className="d-flex flex-row justify-content-between align-content-center">
            <h2 className="pt-1" style={{ width: '15vw', height: "100%"}}>Cars owned:</h2>
            <div className="d-flex justify-content-center" style={{ width: '15vw' }}>
              <Button className='mt-0 pr-5' style={{ width: '10vw' }} variant="danger"><Link to={`/home/clients/${clientId}/cars/new`} className='text-light' style={{textDecoration: "none"}}>Add New Car</Link></Button>
            </div>
          </Row>
          
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Car Brand, Model</th>
                <th>License Plate</th>
                <th>Number of Services</th>
              </tr>
            </thead>
            <tbody>
              {client.cars ? renderCarList() : <h3>Client has no registered cars.</h3>}
            </tbody>
          </Table>
        </>
      )}
    </>
    </Col>
    <Col className="col-2"></Col>
  </Row>


  );
}

export default ClientDetailsPage;
