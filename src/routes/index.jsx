import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import HomePublic from '../pages/HomePublic';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import ProfileUpdate from '../pages/ProfileUpdate'
import PasswordUpdate from '../pages/PasswordUpdate';
import { useAuth } from '../hooks/useAuth';

const AppRoutes = () => {
    const { user } = useAuth();

    let routes = useRoutes([
        { path: '/', element: user ? <Home /> : <Login /> },
        { path: '/Admisiones', element: <HomePublic /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/profile', element: <Profile /> },
        { path: '/profileUpdate', element: <ProfileUpdate /> },
        { path: '/passwordUpdate', element: <PasswordUpdate /> },
    ]);

    return routes;
};

export default AppRoutes;
