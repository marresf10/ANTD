import React from "react";
import { useAuth } from "../../hooks/useAuth";
import "./FormProfile.css";
import { useNavigate } from 'react-router-dom';

const FormProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/profileUpdate');
    };

    const inicio = () => {
        navigate('/');
    };

    const handlePasswordUpdate = () => {
        navigate('/passwordUpdate');
    };

    return (
        <div className="form-profile-container">
            <div className="left-section">
                <div className="back-icon" onClick={inicio}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="profile-container">
                    <h2>Perfil de Usuario</h2>
                    <div className="profile-info">
                        <p><strong>Nombre de usuario:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <div className="profile-img">
                            <img src={user.imgurl} alt="Imagen de perfil" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-section">
                <div className="button-container">
                    <button className="profile-button" onClick={handleEditProfile}>Editar información</button>
                    <button className="profile-button" onClick={handlePasswordUpdate}>Cambiar Contraseña</button>
                </div>
            </div>
        </div>
    );
};

export default FormProfile;
