import './App.css';
import { Route, Routes } from 'react-router-dom';
import IsPrivate from './Components/isPrivate';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/authPages/SignupPage';
import LoginPage from './pages/authPages/LoginPage';
import AddClientPage from './pages/clientPages/AddClientPage';
import EditClientPage from './pages/clientPages/EditClientPage';
import ClientListPage from './pages/clientPages/ClientListPage';
import ClientDetailsPage from './pages/clientPages/ClientDetailsPage';
import NavbarComponent from './Components/NavbarComponent';
import CarListPage from './pages/carPages/CarListPage';
import AddCarPage from './pages/carPages/AddCarPage';
import EditCarPage from './pages/carPages/EditCarPage';
import CarDetailsPage from './Components/CarDetailsComponent';
import ServiceListPage from './pages/servicePages/ServiceListPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AddServicePage from './pages/servicePages/AddServicePage';
import EditServicePage from './pages/servicePages/EditServicePage';
import ErrorPage from './pages/ErrorPage';


function App() {

  return (
    <div className="App">
    <NavbarComponent/>

    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/home/*' element={<HomePage></HomePage>}>
        <Route index element={<DashboardPage/>}/>
        <Route path='dashboard' element={<IsPrivate><DashboardPage/></IsPrivate>}></Route>
        <Route path='clients' element={<IsPrivate><ClientListPage/></IsPrivate>}></Route>
        <Route path='clients/create' element={<IsPrivate><AddClientPage/></IsPrivate>}></Route>
        <Route path='clients/:clientId' element={<IsPrivate><ClientDetailsPage/></IsPrivate>}></Route>
        <Route path='clients/:clientId/edit' element={<IsPrivate><EditClientPage/></IsPrivate>}></Route>
        <Route path='clients/:clientId/cars/new' element={<IsPrivate><AddCarPage/></IsPrivate>}></Route>

        <Route path='cars/*' element={<IsPrivate><CarListPage/></IsPrivate>}>
          <Route path=':carId' element={<IsPrivate><CarDetailsPage/></IsPrivate>}></Route>
        </Route>
        <Route path='cars/:carId/edit' element={<IsPrivate><EditCarPage/></IsPrivate>}></Route>
        <Route path='services' element={<IsPrivate><ServiceListPage/></IsPrivate>}></Route>
        <Route path='cars/:carId/new-service' element={<IsPrivate><AddServicePage/></IsPrivate>}></Route>
        <Route path='cars/:carId/:serviceId/edit-service' element={<IsPrivate><EditServicePage/></IsPrivate>}></Route>
      </Route>

      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/*' element={<ErrorPage/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
