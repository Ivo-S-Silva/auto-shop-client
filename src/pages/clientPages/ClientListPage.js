import React from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ClientListPage(props) {

    const numberOfServices = (cars) => {
        let servicesTotal = 0;

        cars.forEach(car => {
            servicesTotal = servicesTotal + car.services.length;
        })

        return servicesTotal;
    }


    const renderClientList = () => {
      return props.clients.map(client => {
        return(
            <tr>
                <td><Link to={`/clients/${client._id}`} >{client.name}</Link></td>
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
                {props.clients === null ? <p>Loading...</p> : renderClientList()}
            </tbody>
        </Table>
    </>
  )
}

export default ClientListPage;