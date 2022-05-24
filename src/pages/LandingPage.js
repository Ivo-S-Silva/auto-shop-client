import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

function LandingPage(props) {

  return (
    <>
      <h1>Hello. Landing Page.</h1>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
    </>
  )
}

export default LandingPage