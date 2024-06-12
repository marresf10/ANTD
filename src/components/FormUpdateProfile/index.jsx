import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import "./FormUpdateProfile.css"; 

const FormUpdateProfile = () => {
    const { user, logout } = useAuth();
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const navigate = useNavigate();

    const handleSaveChanges = () => {
        console.log("Datos guardados:", { username, email });
        // Aquí puedes agregar la lógica para guardar los cambios
    };

    const volver = () => {
        navigate('/profile'); 
    };

    return (
        <div className="centered-container">
            <div className="back-icon" onClick={volver}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            <div className="profile-container">
                <form className="profile-form">
                    <div className="form-group">
                    <h3>Editar datos del usuario</h3>
                        <label htmlFor="username">Nombre de usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="button-container">
                        <button type="button" onClick={handleSaveChanges}>
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormUpdateProfile;
