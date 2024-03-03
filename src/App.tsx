import { useState, useEffect } from 'react';
import { fetchPublicMembers, addMember } from './api'; // Adjust based on your project structure

// Interface for member data
interface Member {
  id: string;
  first_name: string;
  last_name: string;
  member_no: string;
  membership: string;
  status: boolean;
}

// The form component for adding a new member
const AddMemberForm = ({ onMemberAdded }: { onMemberAdded: () => void }) => {
  const initialFormData = {
    first_name: '',
    last_name: '',
    member_no: '',
    membership: '',
    status: false,
  };
  
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMember(formData);
      alert('Member added successfully');
      setFormData(initialFormData); // Reset form data to initial state
      onMemberAdded(); // Trigger data refresh or update
    } catch (error) {
      alert('Failed to add member');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="member_no"
        value={formData.member_no}
        onChange={handleChange}
        placeholder="Member No"
      />
      <input
        type="text"
        name="membership"
        value={formData.membership}
        onChange={handleChange}
        placeholder="Membership Duration"
      />
      <label>
        Status:
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange} // This handles checkbox state
        />
      </label>
      <button type="submit">Add Member</button>
    </form>
  );
};

// The main app component
const App = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const loadMembers = async () => {
    const fetchedMembers = await fetchPublicMembers();
    setMembers(fetchedMembers);
  };

  // Refresh members list
  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div>
      <h1>Add New Member</h1>
      <AddMemberForm onMemberAdded={loadMembers} />
      <h2>Members List</h2>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            {member.first_name} {member.last_name} - Member No: {member.member_no}, Membership: {member.membership}, Status: {member.status ? 'Active' : 'Inactive'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;