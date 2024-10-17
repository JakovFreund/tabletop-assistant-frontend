import axios from 'axios';

const API_URL = 'http://192.168.100.2:8080/api'; // Set the correct local IP here

export const getPlayerStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/players`);
        return response.data;
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw error;
    }
};

export const getGameState = async () => {
    try {
        const response = await axios.get(`${API_URL}/gamestate`, { timeout: 30000 }); // Set timeout for long polling (30 seconds)
        return response.data;
    } catch (error) {
        console.error('Error fetching gamestate:', error);
        throw error;
    }
};

// New API method to update HP
export const updateCreatureHP = async (creatureId: string, newHP: number) => {
    try {
        const response = await axios.put(`${API_URL}/creature/${creatureId}/hp`, { hp: newHP });
        return response.data;
    } catch (error) {
        console.error('Error updating HP:', error);
        throw error;
    }
};
