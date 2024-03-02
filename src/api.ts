// src/api.ts
import axios from 'axios';

// Confirm this base URL matches your environment and the API path is correct
const api = axios.create({
  baseURL: 'http://127.0.0.1:8090/api', // No trailing slash here
});

export const fetchPublicMembers = async () => {
    try {
        const response = await api.get('/collections/members/records');
        console.log("Fetched members:", response.data); // Log to see the actual response
        return response.data.items;
    } catch (error) {
        console.error("Error fetching members:", error);
        return [];
    }
};

