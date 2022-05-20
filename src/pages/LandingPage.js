import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

function LandingPage() {

    const {user, logOutUser} = useContext(AuthContext);


  return (
    <>
    <span>Welcome {user.email}</span>
    <button onClick={() => {logOutUser()}}>Logout</button>
    </>
  )
}

export default LandingPage