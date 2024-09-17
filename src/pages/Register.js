import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, login } from '../services/auth';
import loginBg from '../img/loginbg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (register(username, email, password)) {
      login(username, password);
      navigate('/dashboard');
    } else {
      setError('Username or email already exists');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginBg})`,
        }}
      ></div>

      {/* Blur overlay */}
      <div 
        className="absolute inset-0 backdrop-filter"
        style={{
          backdropBlur: 'blur(4px)'
        }} 
      ></div>

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)'
        }}
      ></div>
      
      {/* Content */}
      <div className="max-w-md w-full space-y-8 bg-black bg-opacity-30 backdrop-filter backdrop-blur-md p-8 shadow-lg rounded-lg relative z-10">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-bold text-red-600">
            Register
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            {/* Username field with icon */}
            <div className="relative">
              <label htmlFor="username" className="sr-only">Username</label>
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-t-lg block w-full px-10 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-70"
                placeholder="Username"
                required
              />
            </div>

            {/* Email field with icon */}
            <div className="relative mt-2">
              <label htmlFor="email" className="sr-only">Email</label>
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-10 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-70"
                placeholder="Email"
                required
              />
            </div>

            {/* Password field with icon */}
            <div className="relative mt-2">
              <label htmlFor="password" className="sr-only">Password</label>
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-10 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-70"
                placeholder="Password"
                required
              />
            </div>

            {/* Confirm Password field with icon */}
            <div className="relative mt-2">
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-b-lg block w-full px-10 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-70"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
            >
              Register
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-200">
            Already have an account? {' '}
            <Link to="/login" className="font-medium text-red-600 hover:text-red-800">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;