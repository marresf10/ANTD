import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // Modificamos el estado inicial de user
    const [user, setUser] = useState('Ana');

    // Definimos las funciones de login, logout y actualizar usuario
    const login = () => console.log('login');
    const logout = () => {
        setUser(null);
        console.log('logout');
    };
    const upDateUser = () => console.log('update user');

    // Redireccionamos al usuario a /login si no está autenticado
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Objeto data que será proporcionado al contexto
    const data = {
        user,
        login,
        logout,
        upDateUser
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
