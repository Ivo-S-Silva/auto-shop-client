import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function EditClientPage(props) {
  const { clientId } = useParams();

  const [clients, fetchClientList] = useOutletContext();
  const { user } = useContext(AuthContext);
  const clientDetails = clients.find((client) => client._id === clientId);

  const [name, setName] = useState(clientDetails.name);
  const [fiscalNumber, setFiscalNumber] = useState(clientDetails.fiscalNumber);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClientDetails = {
      name,
      fiscalNumber,
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/clients/${clientId}`,
        newClientDetails,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            CurrentUserId: user._id,
          },
        }
      )
      .then((response) => {
        navigate(`/home/clients/${clientId}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log(
          "There was an error editing client information",
          errorDescription
        );
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Row className="col-12 mt-3">
      <Col className="col-3"></Col>
      <Col className="col-6" style={{backgroundColor: "#f2f2f2"}}>
        <Form onSubmit={handleSubmit}>
        <Form.Text><h1 className='mb-4 mt-4'>Edit Client Information</h1></Form.Text>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              required={true}
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFiscalNumber">
            <Form.Label>Fiscal Number</Form.Label>
            <Form.Control
              required={true}
              name="fiscalNumber"
              value={fiscalNumber}
              type="Number"
              onChange={(e) => {
                setFiscalNumber(e.target.value);
              }}
            />
          </Form.Group>

          <Button className='mb-4' variant="danger" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
      <Col className="col-3"></Col>
    </Row>
  );
}

export default EditClientPage;
