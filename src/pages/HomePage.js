import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet} from 'react-router-dom'


function HomePage(props) {
  const [clients, setClients] = useState([]);

  // Retrieving the token from local storage to be able to send it in the headers
  // of the query to the database with axios
  const storedToken = localStorage.getItem('authToken');
  

const fetchClientList = () => {
  axios.get(`${process.env.REACT_APP_API_URL}/clients`, {headers: {Authorization: `Bearer ${storedToken}`}})
  .then(response => {
    setClients(response.data)
  })
  .catch(error => console.log("There was an error getting the client list from the API", error))
}

useEffect(() => {
  fetchClientList()
}, [])


  return <Outlet context={[clients, fetchClientList]}/>
}

export default HomePage