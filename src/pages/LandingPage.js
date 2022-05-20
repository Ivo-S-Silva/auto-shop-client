import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

function LandingPage(props) {

    console.log(props)
  
    const {user, logOutUser} = useContext(AuthContext);

    const renderClientList = () => {
      return props.clients.map(client => {
        return(
          <h1 key={client._id}>{client.name}</h1>
        )
      })
    }

  return (
    <>
      {renderClientList()}
    </>
  )
}

export default LandingPage