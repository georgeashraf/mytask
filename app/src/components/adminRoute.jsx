import React, {useContext} from 'react'
import { Route, Navigate } from 'react-router-dom'
import cookie from 'js-cookie'

// import { AuthContext } from '../context/auth.js'


const PrivateRoute = ({ children }) => {
    // const [auth, setAuth]  = useContext(AuthContext)

    // const authed = isauth() // isauth() returns true or false based on localStorage
    const existingTokens = cookie.get('token');
        const existingRole = cookie.get('role');
    return existingTokens && existingRole ? children : <Navigate to="/login" />;
  }

export default PrivateRoute;
