import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from 'antd';
import NavBar from '../../components/NavBar';

const Home = () => {
    const { user, logout } = useAuth();
    return (
        <>
        <div>
        <NavBar />
        </div>
            <h1>Hola {user.username}</h1>
            <Button onClick={() => logout()}>Cerrar sesión</Button>
        </>
    );
};

export default Home;
