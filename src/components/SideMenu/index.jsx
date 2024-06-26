import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = ({ onClose }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    const perfil = () => {
        navigate('/profile');
    };

    return (
        <div className="side-menu-container">
                <button className="close-button" onClick={onClose}>✖</button>
                <div className="side-menu">
                <center>
                    <h2>Hola {user.username}</h2>
                    <img className='side-img' width={200} height={200} src={user.imgurl} />
                </center>
                <div className="bottom-buttons">
                    <button onClick={perfil}>Cuenta</button>
                    <button className="button2" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;