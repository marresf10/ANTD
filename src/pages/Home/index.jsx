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
        </>
    );
};

export default Home;
