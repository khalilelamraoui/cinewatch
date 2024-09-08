import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginBg from '../img/loginbg.jpg';
import { getUsers } from '../services/auth';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();  // Fetch users from local storage
    const user = users.find(u => u.email === email);
    
    if (user) {
      localStorage.setItem('resetEmail', email); // Temporarily store email for password reset
      setMessage('If an account with that email exists, a reset link has been sent.');
    } else {
      setMessage('If an account with that email exists, a reset link has been sent.');
    }
  
    setTimeout(() => {
      navigate('/reset-password');  // Redirect to the reset password page
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${loginBg})` }}
      ></div>

      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-filter backdrop-blur-sm"></div>

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)'
        }}
      ></div>
      
      <div className="max-w-md w-full space-y-8 bg-black bg-opacity-30 backdrop-filter backdrop-blur-md p-8 shadow-lg rounded-lg relative z-10">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-bold text-red-600">
            Forgot Password
          </h2>
        </div>
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-lg block w-full px-4 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-70"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <div>
          <Link to="/login" className="font-medium text-red-600 hover:text-red-800">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;