import { jwtDecode } from "jwt-decode";
import { ENV } from "../utils/constants";
import { authFetch } from "../utils/authFetch";

const admisiones = async (token) => {
    try {
        
        const url =`${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}`
        const response = await authFetch(url);

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const admisionesService = {
    admisiones
}