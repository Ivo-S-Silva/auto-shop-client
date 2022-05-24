import React, { useContext } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

function LandingPage(props) {

return <Navigate to='/home'/>
}

export default LandingPage