import axios from 'axios';

const register = async (username, email, password) => {
    return axios.post('https://lizard-server.vercel.app/api/auth/signup', {
        username,
        email,
        password,
        roles: ['moderador'],
    });
};

//https://lizard-server.vercel.app/api/auth/signup

const loginF = async (email, password) => {
    return axios.post('https://lizard-server.vercel.app/api/auth/signin', {
        email,
        password,
    });
};

export default{
    register,
    loginF,
};