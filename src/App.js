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
import AddClientPage from './pages/clientPages/AddClientPage';
import EditClientPage from './pages/clientPages/EditClientPage';
import ClientListPage from './pages/clientPages/ClientListPage';
import ClientDetailsPage from './pages/clientPages/ClientDetailsPage';
import NavbarComponent from './Components/NavbarComponent';


function App() {

  const [clients, setClients] = useState([]);

  const {user} = useContext(AuthContext);

  // Retrieving the token from local storage to be able to send it in the headers
  // of the query to the database with axios
  const storedToken = localStorage.getItem('authToken');


  useEffect(() => {
    getClientList();
  }, [])

  const getClientList = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/clients`, {headers: {Authorization: `Bearer ${storedToken}`}})
    .then(response => {
      setClients(response.data);
    })
    .catch(error => console.log("There was an error getting the client list from the API", error))
  }



  return (
    <div className="App">
    <IsPrivate><NavbarComponent/></IsPrivate>
    <Routes>
      <Route path='/' element={<IsPrivate><LandingPage clients={clients}/></IsPrivate>}></Route>
      <Route path='/clients' element={<IsPrivate><ClientListPage clients={clients}/></IsPrivate>}></Route>
      <Route path='/clients/create' element={<IsPrivate><AddClientPage callbackGetClientList={getClientList}/></IsPrivate>}></Route>
      <Route path='/clients/:clientId' element={<IsPrivate><ClientDetailsPage/></IsPrivate>}></Route>
      <Route path='/clients/:clientId/edit' element={<IsPrivate><EditClientPage callbackGetClientList={getClientList}/></IsPrivate>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
