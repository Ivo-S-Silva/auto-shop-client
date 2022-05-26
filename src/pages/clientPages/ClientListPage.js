import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom";

function ClientListPage() {
  const [clients] = useOutletContext();

  const numberOfServices = (cars) => {
    let servicesTotal = 0;

    cars.forEach((car) => {
      servicesTotal = servicesTotal + car.services.length;
    });

    return servicesTotal;
  };

  const renderClientList = () => {
    return clients.map((client) => {
      return (
        <tr key={client._id}>
          <td className="col-1">
            <Button variant="danger" href={`/home/clients/${client._id}`}>
              Profile
            </Button>
          </td>
          <td className="pt-3">{client.name}</td>
          <td className="pt-3">{client.cars.length}</td>
          <td className="pt-3">{numberOfServices(client.cars)}</td>
        </tr>
      );
    });
  };

  return (clients ? 
    <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Client Name</th>
            <th>Number of Cars</th>
            <th>Number of Services</th>
          </tr>
        </thead>
        <tbody>
          {renderClientList()}
        </tbody>
      </Table> : 
      <>
        <h1 className="mt-3">There aren't currently any clients registered.</h1>
        <Button variant='danger'><Link to='/home/clients/create' className='text-white' style={{textDecoration: "none"}}>Add New Client</Link></Button>
      </>

  );
}

export default ClientListPage;
