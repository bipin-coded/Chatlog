import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isLogedIn = localStorage.getItem('user:token') !== null;
    return (
        !isLogedIn
            ? <Navigate to={'/users/sign_in'} />
            : <Outlet />
    )
}

export default ProtectedRoute