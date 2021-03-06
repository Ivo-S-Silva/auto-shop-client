import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

    const storeToken = (token) => {
    localStorage.setItem("authToken", token)
    }

    useEffect(() => {
    authenticateUser();
    }, []);

    const authenticateUser = () => {
    const storedToken = localStorage.getItem('authToken');

    //If the token exists in the local storage
    if (storedToken) {
        axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`, {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(response => {
                //If the server verifies that JWT token is valid
                const user = response.data;

                //Update state variables
                setIsLoading(false);
                setIsLoggedIn(true);
                setUser(user);
            })
            .catch(error => {
                //If the server sends an error response (invalid token), update state variables
                localStorage.removeItem('authToken');
                setIsLoading(true);
                setIsLoggedIn(false);
                setUser(null)
                navigate('/login');
            });
    } else {
        //If the token is not available or is removed
        setIsLoading(false);
        setIsLoggedIn(false);
        setUser(null);
        navigate('/login');
    }
    }

    const removeToken = () => {
    localStorage.removeItem("authToken");
    }
 
    const logOutUser = () => {   
    removeToken();
    authenticateUser();
    navigate("/login")
    }  

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };