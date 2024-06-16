import { jwtDecode } from "jwt-decode";
import { ENV } from '../utils/constants';

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
};

export const deleteAdmissionsService = {
    deleteAdmissions
};
