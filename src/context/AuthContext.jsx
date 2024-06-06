import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageController } from '../services/token'; // Importa el controlador de almacenamiento

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState('Ana');

    // Llama a getSession cuando el componente se monta
    useEffect(() => {
        getSession();
    }, []);
    // Función para obtener el token desde el almacenamiento local
    const getSession = async () => {
        const token = await storageController.getToken();
        console.log('Token: ', token);
    };

    // En la función login()
    const login = async (token) => {
        try {
            console.log('Token -->:', token); // Muestra el token en la consola
            storageController.setToken(token);
            setUser('Ana');
            navigate('/');
        } catch (error) {
            console.error('Error setting token in storage:', error);
        }
    };

    const logout = () => {
        try {
            storageController.removeToken();
            setUser(null);
            console.log('logout');
            navigate('/login');
        } catch (error) {
            console.error('Error removing token from storage:', error);
        }
    };

    const upDateUser = () => console.log('update user');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const data = {
        user,
        login,
        logout,
        upDateUser,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
