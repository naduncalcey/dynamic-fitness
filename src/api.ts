import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dynamic-fitnes.pockethost.io/api',
});

export const fetchPublicMembers = async () => {
  try {
    const response = await api.get('/collections/members/records');
    return response.data.items;
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
};