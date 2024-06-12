// SideMenu.js
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import FormProfile from '../FormProfile';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({ onClose }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    const handleEditProfile = () => {
        navigate('/profile');  // Navega a la ruta de perfil
    };

    return (
        <div className="side-menu">
            <button onClick={handleLogout}>Cerrar sesión</button>
            <button onClick={handleEditProfile}>Editar perfil</button>
        </div>
    );
};

export default SideMenu;
