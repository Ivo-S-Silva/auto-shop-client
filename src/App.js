import logo from './logo.svg';
import './App.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import IsPrivate from './Components/isPrivate';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/authPages/SignupPage';
import LoginPage from './pages/authPages/LoginPage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/auth.context';
import axios from 'axios';


function App() {

  const {isLoggedIn} = useContext(AuthContext);

  const [clients, setClients] = useState([]);

  // Retrieving the token from local storage to be able to send it in the headers
  // of the query to the database with axios
  

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    axios.get(`${process.env.REACT_APP_API_URL}/clients`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        setClients(response.data);
      })
      .catch(error => console.log("There was an error getting the client list from the API", error))
  }, [clients])

  return (
    <div className="App">
    <Routes>
      <Route path='/' element={!isLoggedIn ? <LoginPage/> : <LandingPage clients={clients}/>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
