import React from "react";
import { Table, Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

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

  return (
    <>
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
          {clients === null ? <p>Loading...</p> : renderClientList()}
        </tbody>
      </Table>
    </>
  );
}

export default ClientListPage;
