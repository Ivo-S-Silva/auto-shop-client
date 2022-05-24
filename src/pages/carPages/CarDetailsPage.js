import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function CarDetailsPage(props) {

const getCurrentCar = props.getCurrentCar;

const {carId} = useParams();

const [car, setCar] = useState('');
const [services, setServices] = useState([]);


const storedToken = localStorage.getItem('authToken');

console.log(storedToken);

useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/cars/${carId}`, {headers: { Authorization: `Bearer ${storedToken}` }})
        .then(response => {
            setCar(response.data);
            getCurrentCar(response.data);
            setServices(response.data.services);
        })
        .catch(error => console.log('There was an error getting the car details.', error))
}, [])

  return (
    <>
        <h1>Brand: {car.brand}</h1>
        <h2>Model: {car.model}</h2>
        <h3>License Plate: {car.licensePlate}</h3>
        <Link to={`/cars/${car._id}/edit`}>Edit Car Information</Link>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Service List</h1>
        <hr></hr>
        {services ? services.map(service => {
        return(
            <>
            <h2>Service Date: {service.serviceDate.substr(0, service.serviceDate.indexOf('T'))}</h2>
            <h2>Service Date: {service.serviceDetails}</h2>
            <h2>Service Date: {service.serviceStatus}</h2>
            <Link to={`/services/${service._id}/edit`}>Edit Service Information</Link>
            <hr></hr>
            </>
    )
}
) : <h1>There are currently no services scheduled for this vehicle.</h1>}
    </>
  )
}

export default CarDetailsPage