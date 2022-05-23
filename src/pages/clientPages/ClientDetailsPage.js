import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function ClientDetailsPage() {
  const { clientId } = useParams();
  const [client, setClient] = useState({});

  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/clients/${clientId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => setClient(response.data))
    .catch((error) => {
      console.log(
        "There was an error getting the client details from the database"
      );
    });
  }, [])
  

  return (
    <>
      {!client ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Name: {client.name}</h1>
          <h2>Fiscal Number: {client.fiscalNumber}</h2>
          <Button><Link to={`/clients/${clientId}/edit`} className='text-light' style={{textDecoration: "none"}}>Edit Client Info</Link></Button>
          <h2>Cars owned:</h2>
          <table>
            {client.cars ? client.cars.map(car => {
              return(
                <tr>
                <td>
                {car.brand}, {car.model}
                </td>
                <td>
                  Services: {car.services.length}
                </td>
                </tr>
              )
            }) : <h3>Client has no registered cars.</h3>}
          </table>
          <Button><Link to={`/clients/${clientId}/cars/new`} className='text-light' style={{textDecoration: "none"}}>Add New Car</Link></Button>
        </>
      )}
    </>
  );
}

export default ClientDetailsPage;
