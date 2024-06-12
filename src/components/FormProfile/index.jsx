import React from "react";
import { useAuth } from "../../hooks/useAuth";
import "./FormProfile.css"; 

const FormProfile = () => {
    const { user, logout } = useAuth();
    return (
        <center>
        <div className="centered-container">
            <div className="profile-container">
                <h2>Perfil de Usuario</h2>
                <div className="profile-info">
                    <p><strong>Nombre de usuario:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="button-container">
                    <button>Editar información</button>
                    <button>Cambiar Contraseña</button>
                </div>
            </div>
        </div>
        </center>
    );
};

export default FormProfile;
