import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, getWatchlist, toggleWatchedStatus } from '../services/auth';
import loginBg from '../img/loginbg.jpg';
import dashboardBg from '../img/dashboard.jpg';

// Function to generate greeting message
const getGreeting = (user) => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return `Good Morning, ${user.username}!`;
  } else if (currentHour < 18) {
    return `Good Afternoon, ${user.username}!`;
  } else {
    return `Good Evening, ${user.username}!`;
  }
};

function Dashboard() {
  const user = getCurrentUser();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const totalMovies = watchlist.length;
  const watchedCount = watchlist.filter(movie => movie.watched).length;
  const remainingCount = totalMovies - watchedCount;

  const handleToggleWatched = (movieId) => {
    if (toggleWatchedStatus(movieId)) {
      setWatchlist(getWatchlist());
    }
  };

  return (
    <div className="min-h-screen h-full flex items-center justify-center relative overflow-hidden bg-gray-900">
      {/* Background image for the entire page */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center blur-sm opacity-70"
        style={{ backgroundImage: `url(${loginBg})` }}
      ></div>

      {/* Main dashboard container with background image */}
      <div 
        className="container mx-auto px-4 py-8 relative bg-black bg-opacity-70 rounded-lg shadow-lg backdrop-blur-lg"
        style={{ backgroundImage: `url(${dashboardBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">Dashboard</h1>
        
        {/* Greeting container */}
        <div className="bg-gray-800 bg-opacity-90 rounded-lg shadow-lg p-6 mb-8 flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-white mb-4">{getGreeting(user)}</h2>
          <p className="text-lg text-gray-300 mb-2">Email: {user.email}</p>
          <p className="text-lg text-gray-300 mb-4">You have {totalMovies} movies in your watchlist.</p>
          <Link to="/watchlist" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out shadow-md">
            View Watchlist
          </Link>
        </div>
        
        <div className='flex flex-col lg:flex-row gap-4 mb-8'>
          {/* Movie Stats Section */}
          <div className="bg-gray-800 bg-opacity-90 rounded-lg shadow-lg p-6 flex-1">
            <h2 className="text-2xl font-bold text-white mb-6">Movie Stats</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-white font-bold">Total Movies:</p>
              <p className="text-white font-semibold">{totalMovies}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-white font-bold">Movies Watched:</p>
              <p className="text-white font-semibold">{watchedCount}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-white font-bold">Movies Left:</p>
              <p className="text-white font-semibold">{remainingCount}</p>
            </div>
  
            {/* Progress Bar */}
            {totalMovies > 0 && (
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mt-4">
                <div 
                  className="bg-green-500 h-full" 
                  style={{ width: `${(watchedCount / totalMovies) * 100}%` }}
                ></div>
              </div>
            )}
          </div>
           
          {/* Quick Links */}
          <div className="bg-gray-800 bg-opacity-90 rounded-lg shadow-lg p-6 flex-1">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-red-500 hover:text-red-700 text-lg font-medium transition duration-300 ease-in-out">Browse Movies</Link>
              </li>
              <li>
                <Link to="/watchlist" className="text-red-500 hover:text-red-700 text-lg font-medium transition duration-300 ease-in-out">Manage Watchlist</Link>
              </li>
            </ul>
          </div> 
        </div>
   {/* Watchlist Section */}
   <div className="bg-gray-800 bg-opacity-90 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Your Watchlist</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {watchlist.map(movie => (
              <div key={movie.id} className="flex flex-col">
                <Link to={`/movie/${movie.id}`} className="card bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-2">
                    <h1 className='text-sm font-semibold text-white text-center truncate'>{movie.title}</h1>
                  </div>
                </Link>
                <button 
                  onClick={() => handleToggleWatched(movie.id)}
                  className={`mt-3 px-3 py-1 rounded text-xs ${movie.watched ? 'bg-green-500' : 'bg-gray-500'} text-white w-full`}
                >
                  {movie.watched ? 'Watched' : 'Mark as Watched'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
