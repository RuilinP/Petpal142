import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const accessToken = localStorage.getItem('accessToken');

  const fetchUserDetails = async (userId, userType) => {
    const response = await fetch(`http://localhost:8000/accounts/${userType}s/${userId}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
    }
  };

  const updateUser = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        const userId = decoded.user_id;

        // Try fetching as seeker, if not found, try as shelter
        fetchUserDetails(userId, 'seeker')
          .catch(() => fetchUserDetails(userId, 'shelter'));
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  // Effect to update user when the component mounts
  useEffect(() => {
    updateUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
