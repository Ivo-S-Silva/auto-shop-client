import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function CarListPage() {
  const [cars, setCarList] = useState(null);
  const [currentCar, setCurrentCar] = useState(null);

  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getCarList();
  }, []);

  const getCarList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cars`, {
        headers: { Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id  },
      })
      .then((response) => {
        if(response.data.length >= 1) {
        let sortedResponse = [...response.data];

        sortedResponse.sort((x,y) => {
            if(x.brand > y.brand) return 1;
            if(y.brand > x.brand) return -1;
            return x.model - y.model;
        })
        setCarList(sortedResponse);
      }
      })
      .catch((error) =>
        console.log(
          "There was an error getting the car list from the database.",
          error
        )
      );
  };

  const deleteCar = (carToDelete) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/cars/${carToDelete}`, {
      headers: { Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id }
    })
    .then(() => {
      getCarList();
      navigate('/home/cars')
    })
    .catch(error => console.log('There was an error removing the car from the database.', error))
  }

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
        {cars ? renderCarList() : <h2 className='mt-5'>There are no cars currently registered.</h2>}
      </Col>
      <Col className='col-6'>
        {currentCar ? <Outlet context={[cars, getCarList, deleteCar]}/> : <h2 className="mt-5">Select a car to see detailed information.</h2> }
      </Col>
    </Row>
    </>
  );
}

export default CarListPage;
