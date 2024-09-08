import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';
import loginBg from '../img/loginbg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(usernameOrEmail, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid username/email or password');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
            Login
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Username/Email field with icon */}
          <div className="rounded-md shadow-sm">
            <div className="relative">
              <label htmlFor="usernameOrEmail" className="sr-only">
                Username or Email
              </label>
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                required
                className="appearance-none rounded-t-lg block w-full px-10 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-70"
                placeholder="Username or Email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>

            {/* Password field with icon and show/hide functionality */}
            <div className="relative mt-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="appearance-none rounded-b-lg block w-full px-10 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-70"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                onClick={toggleShowPassword}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          
          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-200">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-800">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
            >
              Login
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-200">
            Don't have an account? {' '}
            <Link to="/register" className="font-medium text-red-600 hover:text-red-800">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
