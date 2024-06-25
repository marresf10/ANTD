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
        <center>
        <div className="centered-container">
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
                    <center><img width={200} height={200} src={user.imgurl}/></center>
                </div>
                <div className="button-container">
                    <button onClick={handleEditProfile}>Editar información</button>
                    <button onClick={handlePasswordUpdate}>Cambiar Contraseña</button>
                </div>
            </div>
        </div>
        </center>
    );
};

export default FormProfile;
