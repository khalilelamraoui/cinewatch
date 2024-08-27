import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await login(username, password); // Assuming login returns a promise
        navigate('/'); // Redirect to a successful page
      } catch (err) {
        setError('Login failed. Please check your credentials and try again.'); // Handle errors
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className='w-[400px] flex-col'>
        <div className='m-4'>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          className='border border-gray-400 rounded'
          />
        </div>
        <div className='ml-4'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          className='border border-gray-400 rounded'
          />
        </div>
        <button type="submit" className='px-4 py-2 bg-green-400 rounded m-4'>Login</button>
        {error && <p>{error}</p>} {/* Display error message */}
      </form>
    );
  };
  
  export default Login;
