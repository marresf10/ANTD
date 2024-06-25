import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import "./FormUpdateProfile.css"; 

const FormUpdateProfile = () => {
    const { user, updateUser } = useAuth();
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [imgurl, setImgUrl] = useState(user?.imgurl || '');
    //const [roles, setRoles] = useState(user?.roles || []); // Estado local para los roles
    const navigate = useNavigate();

    const handleSaveChanges = async () => {
        const userData = {
            id: user._id,
            username,
            email,
            imgurl
        };

        try {
            await updateUser(userData);
            console.log("Datos guardados:", { username, email, imgurl });
            navigate('/profile'); 
        } catch (error) {
            console.log("Failed to update user", error);
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
                        <h2><center>Editar datos del usuario</center></h2>
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
                    <div className="form-group">
                        <label htmlFor="imagen">Url imagen:</label>
                        <input
                            type="text"
                            id="imgurl"
                            value={imgurl}
                            onChange={(e) => setImgUrl(e.target.value)}
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

