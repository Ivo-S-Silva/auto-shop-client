import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function CarListPage() {
  const [cars, setCarList] = useState([]);
  const [currentCar, setCurrentCar] = useState(null);

  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getCarList();
  }, []);

  const getCarList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cars`, {
        headers: { Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id  },
      })
      .then((response) => {
        let sortedResponse = [...response.data];

        sortedResponse.sort((x,y) => {
          let n = x.brand - y.brand;
          if (n !== 0) {
            return n;
          }
          return x.model - y.model;
        })

        setCarList(sortedResponse);
      })
      .catch((error) =>
        console.log(
          "There was an error getting the car list from the database.",
          error
        )
      );
  };

  const renderCarList = (page) => {    
    return cars.map((car) => {
      let carName = car.brand + " " + car.model;
        return (
          <Row key={car._id} className="pb-1 pt-1 align-items-center border-bottom">
            <Col>
              <div style={{height: "100%"}}>{carName.length > 20 ? carName.slice(0, 20) + "..." : carName}</div>
            </Col>
            <Col className='col-2'>
              <div style={{height: "100%"}}>{car.licensePlate}</div>
            </Col>
            <Col className='col-2'>
              <Button className='mt-0' variant="danger"><Link className='text-light' style={{textDecoration: "none"}} to={`/home/clients/${car.owner}`}>Owner</Link></Button>
            </Col>
            <Col className='col-3'>
              <Button className='mt-0' variant="danger" onClick={() => setCurrentCar(car)}><Link className='text-light' style={{textDecoration: "none"}} to={`/home/cars/${car._id}`}>Car Details</Link></Button>
            </Col>
          </Row>
        );
      })
  }

  return (
    <><Row style={{width: '100%'}}>
      <Col className='col-6' style={{height: "92.7vh", overflowY: "scroll", backgroundColor: "#d6d6d6"}}>
        <div className="mt-1"></div>
        {renderCarList()}
      </Col>
      <Col className='col-6'>
        {currentCar ? <Outlet context={[cars, getCarList]}/> : <h2 className="mt-5">Select a car to see detailed information.</h2> }
      </Col>
    </Row>
    </>
  );
}

export default CarListPage;
