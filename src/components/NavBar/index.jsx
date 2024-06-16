import React, { useState } from 'react';
import './NavBar.css';
import { useAuth } from '../../hooks/useAuth';
import SideMenu from '../SideMenu';
import TableAdmisiones from '../../components/TableAdmisiones';


const NavBar = () => {
    const { logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="navbar-brand">Mi página</div>
                <ul className="navbar-menu">
                    <li className="navbar-item"><a href="/">Admisiones</a></li>
                    <li className="navbar-item">
                        <a href="#perfil" onClick={toggleMenu}>Perfil</a>
                    </li>
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
