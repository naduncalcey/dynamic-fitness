import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dynamic-fitnes.pockethost.io/api',
});

interface MemberData {
    first_name: string;
    last_name: string;
    member_no: string;
    membership: string;
    status: boolean;
}

export const fetchPublicMembers = async () => {
  try {
    const response = await api.get('/collections/members/records');
    console.log(response.data.items);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
};

export const addMember = async (memberData: MemberData) => {
    try {
        const response = await api.post('/collections/members/records', memberData);
        return response.data; // Returns the response data from the server
    } catch (error) {
        console.error("Error adding member:", error);
        throw error; // Rethrow or handle as needed
    }
};