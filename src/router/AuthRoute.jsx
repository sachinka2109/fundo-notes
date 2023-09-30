import React from 'react'
import { Navigate } from 'react-router-dom';

let AuthRoute = ({children}) => {
    const token = localStorage.getItem('token');
    if(!token) {
        // console.log('this is  auth route')
        return children
    }
    return <Navigate to='/dashboard' replace/>
}

export default AuthRoute