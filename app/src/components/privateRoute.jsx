import React, {useContext} from 'react'
import { Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.js'
import cookie from 'js-cookie'



const PrivateRoute = ({ children }) => {
    const existingTokens = cookie.get('token');
        const existingRole = cookie.get('role');
    // const [auth, setAuth]  = useContext(AuthContext)
    
    return existingTokens ? children : <Navigate to="/login" />;
  }

export default PrivateRoute;
