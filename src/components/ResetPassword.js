import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBg from '../img/loginbg.jpg';
import { getUsers, setUsers } from '../services/auth';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    const resetEmail = localStorage.getItem('resetEmail');
    if (!resetEmail) {
      setMessage('Invalid reset request.');
      return;
    }
  
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === resetEmail);
    if (userIndex !== -1) {
      users[userIndex].password = password; // Update user's password
      setUsers(users); // Save updated users back to local storage
      localStorage.removeItem('resetEmail'); // Clear the resetEmail after successful reset
      setMessage('Password has been reset successfully');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setMessage('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)'
        }}
      />
      
      <div className="max-w-md w-full space-y-8 bg-black bg-opacity-30 backdrop-blur-md p-8 shadow-lg rounded-lg relative z-10">
        <h2 className="mt-6 text-center text-3xl font-bold text-red-600">
          Reset Password
        </h2>
        
        {message && (
          <div className={`${message.includes('successfully') ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} px-4 py-3 rounded relative`} role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-t-lg block w-full px-4 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-70"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="appearance-none rounded-b-lg block w-full px-4 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-70"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;