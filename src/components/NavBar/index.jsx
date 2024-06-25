import React, { useState } from 'react';
import './NavBar.css';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../SideMenu';
import TableAdmisiones from '../../components/TableAdmisiones';

const NavBar = () => {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const adminRoleId = '666b5995e842a28618ccfc95'; 

    const handleLogout = () => {
        logout();
    };

    const handleLogin = () => {
        navigate('/login'); 
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="navbar-brand">LIZARD 2.0</div>
                <ul className="navbar-menu">
                    {user && user.roles && user.roles.includes(adminRoleId) ? (
                        <>
                            <li className="navbar-item"><a href="/">Admisiones</a></li>
                            <li className="navbar-item">
                                <a href="#perfil" onClick={toggleMenu}>Perfil</a>
                            </li>
                        </>
                    ) : (
                        <li className="navbar-item">
                            <button onClick={handleLogin}>Iniciar sesión</button>
                        </li>
                    )}
                </ul>
            </nav>

            <main className="home-content">
                <TableAdmisiones />
            </main>
            
            {showMenu && <SideMenu onClose={toggleMenu} />}
        </div>
    );
};

export default NavBar;
