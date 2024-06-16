import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import "./FormPassword.css"; 

const FormUpdatePassword = () => {
    const { user, updateUser } = useAuth();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSaveChanges = async () => {
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const userData = {
            id: user._id,
            password
        };

        try {
            await updateUser(userData);
            console.log("Contraseña guardada:", { password });
            navigate('/profile'); 
        } catch (error) {
            console.log("Failed to update password", error);
        }
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
                        <h2><center>Editar contraseña del usuario</center></h2>
                        <label htmlFor="password">Nueva contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar nueva contraseña:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}

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

export default FormUpdatePassword;
