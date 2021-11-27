import React, {createContext, useState, useEffect} from 'react'
import cookie from 'js-cookie'

export const AuthContext = createContext();
export const AuthProvider = props =>{

    const [auth, setAuth] = useState({"isauth":false,"isadmin":false})
    const handleAuth = (token,role) => {
        console.log("auth")
        console.log(token)
        if (token && role==='admin'){
            setAuth({"isauth":true,"isadmin":true})
        } else if(token && role==='user'){
            setAuth({"isauth":true,"isadmin":false})
        } 
    }
    useEffect(() => {
        const existingTokens = cookie.get('token');
        const existingRole = cookie.get('role');
       

        handleAuth(existingTokens,existingRole);
      }, []);
    
    return(
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    );
};

