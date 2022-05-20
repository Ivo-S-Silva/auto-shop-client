import logo from './logo.svg';
import './App.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import IsPrivate from './Components/isPrivate';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/authPages/SignupPage';
import LoginPage from './pages/authPages/LoginPage';
import { useContext } from 'react';
import { AuthContext } from './context/auth.context';


function App() {

  const {isLoggedIn, isLoading, user, logOutUser} = useContext(AuthContext);

  return (
    <div className="App">
    <Routes>
      <Route path='/' element={!isLoggedIn ? <LoginPage/> : <LandingPage/>}></Route>

      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
