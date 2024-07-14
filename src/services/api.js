import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',  // URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getRecommendations = async (preferences) => {
  try {
    const response = await api.post('/api/recommendations', preferences);
    return response.data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

export const startChat = async (initialMessage) => {
  try {
    const response = await api.post('/api/start-chat', { initialMessage });
    return response.data;
  } catch (error) {
    console.error('Error starting chat:', error);
    throw error;
  }
};

export const sendMessage = async (message) => {
  try {
    const response = await api.post('/api/chat', { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};