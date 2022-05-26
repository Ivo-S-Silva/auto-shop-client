import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
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
                            {car.services ? car.services.map(service => {
                               return (
                                    <tr key={service._id}>
                                      <td className='col-1'><Button variant='danger' href={`/home/clients/${car.owner}`}>Owner</Button></td>
                                      <td className='col-1'><Button variant='danger' href={`/home/cars/${car._id}/${service._id}`}>Service</Button></td>
                                      <td>{car.brand}</td>
                                      <td>{car.model}</td>
                                      <td>{`${service.serviceDetails.slice(0, 60)}...`}</td>
                                      <td>{service.serviceDate.substr(0, service.serviceDate.indexOf('T'))}</td>
                                      <td>{service.serviceStatus}</td>
                                    </tr>
                                )
                            }) : <h1>There are currently no services Scheduled.</h1>}
                        </>
                        )
                })}
        </tbody>
      </Table>
  )
}

export default ServiceListPage