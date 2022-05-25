import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ServiceListPage(props) {
    const [cars, setCars] = useState([]);
    const [services, setservices] = useState([]);

    const storedToken = localStorage.getItem('authToken');

const storeServiceList = (cars) => {
  cars.map(car => {
    setservices(services => services.concat(car.services));
  })
}


useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/cars`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
       return setCars(response.data)
    })
    .then(() => {
      storeServiceList(cars)
    })
    .catch((error) =>
      console.log(
        "There was an error getting the car list from the database.",
        error
      )
    );
}, [])


  return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Brand</th>
            <th>Model</th>
            <th>Details</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {cars.map(car => {
                    return (
                        <>  
                            {car.services.map(service => {
                               return (
                                    <tr key={service._id}>
                                      <td className='col-1'><Button variant='secondary' href={`/home/clients/${car.owner}`}>Owner</Button></td>
                                      <td className='col-1'><Button variant='secondary' href={`/home/cars/${car._id}`}>Service</Button></td>
                                      <td>{car.brand}</td>
                                      <td>{car.model}</td>
                                      <td>{`${service.serviceDetails.slice(0, 60)}...`}</td>
                                      <td>{service.serviceDate.substr(0, service.serviceDate.indexOf('T'))}</td>
                                      <td>{service.serviceStatus}</td>
                                    </tr>
                                )
                            })}
                        </>
                        )
                })}
        </tbody>
      </Table>
  )
}

export default ServiceListPage