import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import IsPrivate from '../Components/isPrivate'
import { AuthContext } from '../context/auth.context'
import AddCarPage from './carPages/AddCarPage'
import CarDetailsPage from './carPages/CarDetailsPage'
import CarListPage from './carPages/CarListPage'
import EditCarPage from './carPages/EditCarPage'
import AddClientPage from './clientPages/AddClientPage'
import ClientDetailsPage from './clientPages/ClientDetailsPage'
import ClientListPage from './clientPages/ClientListPage'
import EditClientPage from './clientPages/EditClientPage'
import ServiceListPage from './servicePages/ServiceListPage'

function HomePage(props) {



  return (
      <>

    <div>HomePage</div>
      </>
  )
}

export default HomePage