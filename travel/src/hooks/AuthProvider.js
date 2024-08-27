import React, { createContext, useState, useCallback } from 'react';

// Create a context with default values
export const AuthContext = createContext();

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Handle user login
  const login = useCallback((username, password) => {
    // Implement your authentication logic here
    const mockUser = { username }; // Mock user object
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  }, []);

  // Handle user logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  // Handle user registration
  const register = useCallback((username, password) => {
    // Implement your registration logic here
    const mockUser = { username }; // Mock user object
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  }, []);

  // Restore user from localStorage on component mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Provide the context value
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
