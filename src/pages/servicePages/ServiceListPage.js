import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ServiceListPage(props) {
    const [cars, setCars] = useState([]);

    const storedToken = localStorage.getItem('authToken');

useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/cars`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
        setCars(response.data)
    })
    .catch((error) =>
      console.log(
        "There was an error getting the car list from the database.",
        error
      )
    );
}, [])

  return (
    <>
        {cars.map(car => {
                    return (
                        <>  
                            {car.services.map(service => {
                               return (<>
                                    <Link to={`/cars/${car._id}`}>{car.brand} - {car.model}</Link>
                                    <h3>Date: {service.serviceDate.substr(0, service.serviceDate.indexOf('T'))}</h3>
                                    <h3>Details: {service.serviceDetails}</h3>
                                    <h3>Status: {service.serviceStatus}</h3>
                                    <hr></hr>
                                </>)
                            })}
                        </>
                        )
                })}
    </>
  )
}

export default ServiceListPage