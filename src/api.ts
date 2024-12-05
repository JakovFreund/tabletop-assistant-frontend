import axios, { AxiosRequestConfig, Method } from 'axios';

const API_URL = 'http://192.168.100.2:8080/api';

const apiRequest = async (method: Method, endpoint: string, data?: any, config?: AxiosRequestConfig) => {
    try {
        const response = await axios({
            method: method,
            url: `${API_URL}${endpoint}`,
            data: data,
            ...config,
        });
        return response.data;
    } catch (error) {
        console.error(`Error during ${method} request to ${endpoint}:`, error);
        throw error;
    }
};

export const generateUUID = async () => {
    return await apiRequest('GET', '/UUID');
};

export const getGameState = async () => {
    return await apiRequest('GET', '/gamestate', null, { timeout: 30000 }); // timeout for long polling (30 seconds)
};

export const saveGameState = async () => {
    return await apiRequest('PUT', '/gamestate');
};

export const setCreatureHP = async (creatureId: string, newHP: number) => {
    return await apiRequest('PUT', `/creature/${creatureId}/hp`, { hp: newHP });
};

export const connectDevice = async (newDeviceId: string) => {
    return await apiRequest('POST', '/connect', { deviceId: newDeviceId })
}

export const getConnectedDevices = async () => {
    return await apiRequest('GET', '/connected');
};

export const saveDevice = async (deviceId: string, deviceNickname: string) => {
    return await apiRequest('PUT', '/device', { deviceId, deviceNickname});
};