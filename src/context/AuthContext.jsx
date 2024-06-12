import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageController } from '../services/token'; // Importa el controlador de almacenamiento
import { usersService } from '../services/users';
import { admisionesService } from '../services/admisones';
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
            const admisiones = await admisionesService.admisiones();
            setUser(response);
            setLoading(false);
            console.log(response); //muestra el objeto del usuario en consola
            console.log(admisiones)
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
    const admisiones = async (token) => {
        try {
            await storageController.setToken(token);
            const response2 = await admisionesService.admisiones();
            setLoading(false);
            console.log('Obteniendo 2', response2)
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    

    
    

    const data = {
        user,
        login,
        //admisiones,
        logout,
        upDataUser: () => console.log('update user')
    };
    if (loading) return null
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
