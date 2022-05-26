import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet} from 'react-router-dom'


function HomePage(props) {
  const [clients, setClients] = useState(null);

  // Retrieving the token from local storage to be able to send it in the headers
  // of the query to the database with axios
  const storedToken = localStorage.getItem('authToken');
  

const fetchClientList = () => {
  axios.get(`${process.env.REACT_APP_API_URL}/clients`, {headers: {Authorization: `Bearer ${storedToken}`}})
  .then((response) => {
    if(response.data.length >= 1) {
    let sortedResponse = [...response.data];

    sortedResponse.sort((x,y) => (x.name - y.name) ? 1 : (y.name > x.name) ? -1 : 0)

    setClients(sortedResponse);
  }
  })
  .catch(error => console.log("There was an error getting the client list from the API", error))
}

useEffect(() => {
  fetchClientList()
}, [])


  return <Outlet context={[clients, fetchClientList]}/>
}

export default HomePage