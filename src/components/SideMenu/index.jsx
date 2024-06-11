// SideMenu.js
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const SideMenu = ({ onClose }) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="side-menu">
            <button onClick={handleLogout}>Cerrar sesión</button>
            <button onClick={onClose}>Editar perfil</button>
        </div>
    );
};

export default SideMenu;
