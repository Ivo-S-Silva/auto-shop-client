import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function ClientListPage(props) {

    const [clients, setClients] = useState([]);

    const callbackGetClientList = props.callbackGetClientList;
    // Retrieving the token from local storage to be able to send it in the headers
    // of the query to the database with axios
    const storedToken = localStorage.getItem('authToken');
    
  
useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/clients`, {headers: {Authorization: `Bearer ${storedToken}`}})
    .then(response => {
      setClients(response.data)
    })
    .catch(error => console.log("There was an error getting the client list from the API", error))
}, [])


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
                {clients === null ? <p>Loading...</p> : renderClientList()}
            </tbody>
        </Table>
    </>
  )
}

export default ClientListPage;