import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from 'antd';
import NavBar from '../../components/NavBar';
import TableAdmisiones from '../../components/TableAdmisiones';



const Home = () => {
    const { user,admisiones,  logout } = useAuth();
    return (
        <>
        <div>
        <NavBar />
        </div>
        </>
    );
};

export default Home;
