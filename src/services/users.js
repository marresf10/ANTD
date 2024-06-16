import { jwtDecode } from "jwt-decode";
import { ENV } from "../utils/constants";
import { authFetch } from "../utils/authFetch";

const getMe = async (token) => {
    try {
        const decoded = jwtDecode(token)
        const userId = decoded.id
        const url =`${ENV.API_URL}/${ENV.ENDPOINTS.USER}/${userId}`
        const response = await authFetch(url);

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const updateMe = async (token, userData) => {
    try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}/${userId}`;
        const response = await authFetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token // Agregar el token en los headers
            },
            body: JSON.stringify(userData),
        });

        return await response.json();
    } catch (error) {
        console.log('Error updating user:', error);
    }
};

export const usersService = {
    getMe,
    updateMe
}