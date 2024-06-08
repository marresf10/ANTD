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

    const data = {
        user,
        login,
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

/*
export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props
    //Crear el estado del suuario
    const [user, setUser] = useState(null);
    //Crear el estado de carga
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    //const [user, setUser] = useState('Ana');

    // Llama a getSession cuando el componente se monta
    useEffect(() => {
        getSession();
    }, []);
    // Función para obtener el token desde el almacenamiento local
    const getSession = async () => {
        const token = await storageController.getToken();
        if(!token){
            logout();
            setLoading(false);
            return;
        }
        if(tokenExpired(token)){
            logout();
        }else{
            login(token);
        }
        //setLoading(false);
        //console.log('Token: ', token);
    };

    // En la función login()
    const login = async (token) => {
        try {
            console.log('Obteniendo', token);
            await storageController.setToken(token);
            const response = await usersService.getMe(token);
            setUser(response);
            setLoading(false);
            //console.log(response); Muestra el objeto del usuario en consola
            
            //console.log('Token -->:', token); // Muestra el token en la consola
            //await storageController.setToken(token);
            //const response = await usersService.getMe(token);
            //setUser('Ana');
            //navigate('/');
            
        } catch (error) {
            console.error('Error setting token in storage:', error);
        }
    };

    const logout = async () => {
        try {
            await storageController.removeToken();
            setUser(null);
            setLoading(false);
            //console.log('logout');
            //navigate('/login');
        } catch (error) {
            //console.error('Error removing token from storage:', error);
            console.log(error);
            setLoading(false);
        }
    };

    const upDateUser = (key, value) => {
        setUser({
            ...user,
            [key]: value
        })
        //console.log('update user');
    }

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const data = {
        user,
        login,
        logout: () => console.log('logout'),
        upDateUser: () => console.log('update user'),
    };
    if (loading) return null
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
*/