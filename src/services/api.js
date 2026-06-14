import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const submitForm = async (data) => {
  try {
    // Attempting real API call to the mock endpoint
    const response = await axios.post(`${API_URL}/submissions`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.warn('API call failed or not found, falling back to local simulation:', error.message);
    
    // Fallback simulation if json-server is not running or error occurs
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Local fallback submission successful' });
      }, 1000);
    });
  }
};

export const checkEmailAvailability = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/availability`, {
      params: { email }
    });
    // If availability is an array, we check if the email exists in it
    const data = response.data;
    const isTaken = Array.isArray(data) ? data.some(item => item.email === email && !item.available) : false;
    return { available: !isTaken };
  } catch (error) {
    // Basic fallback logic
    return { available: !email.endsWith('@taken.com') };
  }
};
