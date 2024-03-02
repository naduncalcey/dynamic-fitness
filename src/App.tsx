import { useState, useEffect } from 'react';
import { fetchPublicMembers } from './api'; // Make sure this import path matches your project

// Updated Member interface to match the new data structure
interface Member {
  id: string;
  first_name: string;
  last_name: string;
  member_no: string;
  membership: string;
  status: boolean;
  created: string;
  updated: string;
}

const App = () => {
  const [members, setMembers] = useState<Member[]>([]);

  // Function to load members from the backend
  const loadMembers = async () => {
    const fetchedMembers = await fetchPublicMembers();
    setMembers(fetchedMembers);
  };

  // Load members on component mount
  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div>
      <h1>Members</h1>
      <button onClick={loadMembers}>Refresh Members</button>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.first_name} {member.last_name} - Member No: {member.member_no}, Membership: {member.membership}, Status: {member.status ? 'Active' : 'Inactive'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;