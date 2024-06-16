import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './SideMenu.css';

const SideMenu = ({ onClose }) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="side-menu-container">
            <div className="side-menu">
                <button className="close-button" onClick={onClose}>Cerrar menú</button>
                <button onClick={handleLogout}>Cerrar sesión</button>
                <button>Editar perfil</button>
            </div>
        </div>
    );
};

export default SideMenu;
