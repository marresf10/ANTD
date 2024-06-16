import { ENV } from "../utils/constants";
import { authFetch } from "../utils/authFetch";

const admisiones = async (token) => {
    try {
        const url =`${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}`;
        const response = await authFetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const addAdmision = async (token, admissionData) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token 
            },
            body: JSON.stringify(admissionData)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const deleteAdmissions = async (token, admisionId) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}/${admisionId}`;
        
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token 
            }
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud de eliminación');
        }

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const admisionesService = {
    admisiones,
    addAdmision,
    deleteAdmissions
}
