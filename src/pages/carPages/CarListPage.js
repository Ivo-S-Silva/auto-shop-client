import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CarListPage() {
  const [cars, setCarList] = useState([]);

  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    getCarList();
  }, []);

  const getCarList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cars`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setCarList(response.data))
      .catch((error) =>
        console.log(
          "There was an error getting the car list from the database.",
          error
        )
      );
  };

  return (
    <>
        {cars && 
            <>
                {cars.map(car => {
                    return (
                    <>
                        <h1>{car.brand}, {car.model}</h1>
                        <Link to={`/clients/${car.owner}`}>{car.licensePlate}</Link>
                    </>)
                })}
            </>
        }
    </>
  );
}

export default CarListPage;
