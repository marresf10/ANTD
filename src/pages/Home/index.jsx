import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from 'antd';

const Home = () => {
    const { user, logout } = useAuth();
    return (
        <>
            <h1>Hola {user.username}</h1>
            <Button onClick={() => logout()}>Cerrar sesión</Button>
        </>
    );
};

export default Home;
