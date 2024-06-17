import { ENV } from "../utils/constants";
import { authFetch } from "../utils/authFetch";

const admisiones = async (token) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}`;
        const response = await authFetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener las admisiones');
    }
};

const getAdmision = async (token, admisionId) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}/${admisionId}`;
        const response = await authFetch(url, {
            headers: {
                'x-access-token': token
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener la admisión');
        }
        const data = await response.json();
        console.log(data); // Imprimir el objeto JSON
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener la admisión');
    }
};


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
        throw new Error('Error al agregar la admisión');
    }
};

const updateAdmision = async (token, admisionId, updatedData) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}/${admisionId}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token 
            },
            body: JSON.stringify(updatedData)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error('Error al actualizar la admisión');
    }
};

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
        throw new Error('Error al eliminar la admisión');
    }
};

export const admisionesService = {
    admisiones,
    getAdmision,
    addAdmision,
    updateAdmision,
    deleteAdmissions
};
