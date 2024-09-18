import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUsers, setUsers } from '../services/auth'; 
import loginBg from '../img/loginbg.jpg'; 


function ResetPassword() {
  //ResetPassword component
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

 
  // Prevent default form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!email) {
      setMessage('Invalid reset request.');
      return;
    }

    // Error message if passwords do not match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match'); 
      return;
    }

    const users = getUsers(); 
    const userIndex = users.findIndex(user => user.email === email);

    // Error message if email is not found
    if (userIndex === -1) {
      setMessage('Invalid reset request.');
      return;
    }

    // Update user's password
    users[userIndex].password = password; 
    setUsers(users);  // Save updated users to local storage

    setMessage('Password has been reset successfully');
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm" />
      {/* Gradient overlay */}
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
        
        {/* Display feedback message */}
        {message && (
          <div className={`${message.includes('successfully') ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} px-4 py-3 rounded relative`} role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        
        {/* Password reset form */}
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