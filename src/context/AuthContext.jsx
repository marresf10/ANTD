import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageController } from '../services/token'; // Importa el controlador de almacenamiento
import { usersService } from '../services/users';
import { tokenExpired } from '../utils/tokenExpired';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;
    //Crear el estado del usuario
    const [user, setUser] = useState(null);
    //Crear el estado de carga
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSession();
    }, []);

    const getSession = async () => {
        const token = await storageController.getToken();
        if(!token){
            logout()
            setLoading(false);
            return
        } if (tokenExpired(token)){
            logout()
        }else {
            login(token)
        }
        
    }

    const login = async (token) => {
        try {
            console.log('Obteniendo', token);
            await storageController.setToken(token);
            const response = await usersService.getMe(token);
            setUser(response);
            setLoading(false);
            console.log(response); //muestra el objeto del usuario en consola
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    const logout = async () => {
        try {
            await storageController.removeToken()
            setUser(null)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }
    
    const updateUser = async (userData) => {
        try {
            const token = await storageController.getToken();
            console.log("Token de updateUser: "+token)
            if (!token) return;
            const updatedUser = await usersService.updateMe(token, userData);
            if (updatedUser) {
                setUser(updatedUser);
            } else {
                console.error('Failed to update user');
            }
        } catch (error) {
            console.error('Update user error:', error);
        }
    };
    
    const data = {
        user,
        login,
        logout,
        updateUser
    };
    if (loading) return null
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
