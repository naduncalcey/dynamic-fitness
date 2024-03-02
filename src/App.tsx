import { useEffect, useState } from 'react';
import { fetchPublicMembers } from './api'; // Ensure this import path matches your project structure
import { Button } from './components/ui/button';

interface Member {
  id: string;
  Email: string;
  Name: string;
}

const App = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const loadMembers = async () => {
    const fetchedMembers = await fetchPublicMembers();
    setMembers(fetchedMembers);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div>
      <h1>Members</h1>
      <Button onClick={loadMembers}>Refresh Data</Button>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.Name} - {member.Email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;