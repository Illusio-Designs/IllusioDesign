import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listUsers, deleteUser } from '../services/loginApi'; // Import listUsers and deleteUser functions
import AddUser from '../components/AddUser'; // Import the new AddUser component

const User = () => {
  const [users, setUsers] = useState([]); // State to hold user list
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/user/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id); // Call deleteUser function
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Update the user list
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Failed to delete user.'); // Set error message if delete fails
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await listUsers();
        setUsers(response.data); // Set the user list from API response
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchUsers(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  if (loading) {
    return <div>Loading users...</div>; // Loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error if it occurs
  }

  return (
    <div>
      <h1>User List</h1>
      <AddUser onUserAdded={(newUser) => setUsers((prevUsers) => [...prevUsers, newUser])} /> {/* Use the AddUser component */}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? ( // Check if users exist
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)} className="text-blue-600">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default User;
