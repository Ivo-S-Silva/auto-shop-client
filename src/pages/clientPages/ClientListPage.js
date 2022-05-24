import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link, useOutletContext } from 'react-router-dom';


function ClientListPage() {

    const [clients] = useOutletContext();

    const numberOfServices = (cars) => {
        let servicesTotal = 0;

        cars.forEach(car => {
            servicesTotal = servicesTotal + car.services.length;
        })

        return servicesTotal;
    }


    const renderClientList = () => {
      return clients.map(client => {
        return(
            <tr>
                <td><Link to={`/home/clients/${client._id}`} >{client.name}</Link></td>
                <td>{client.cars.length}</td>
                <td>{numberOfServices(client.cars)}</td>
            </tr>
        )
      })
    }

  return (
    <>
        <Table>
            <thead>
                <tr>
                    <th>Client Name</th>
                    <th>Number of Cars</th>
                    <th>Number of Services</th>
                </tr>
            </thead>
            <tbody>
                {clients === null ? <p>Loading...</p> : renderClientList()}
            </tbody>
        </Table>
    </>
  )
}

export default ClientListPage;