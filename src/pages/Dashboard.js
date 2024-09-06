import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';
import { getWatchlist } from '../services/localStorage';

function Dashboard() {
  const user = getCurrentUser();
  const watchlist = getWatchlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user.username}!</h2>
        <p className="mb-2">Email: {user.email}</p>
        <p className="mb-4">You have {watchlist.length} movies in your watchlist.</p>
        <Link to="/watchlist" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Watchlist
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="text-blue-500 hover:underline">Browse Movies</Link>
          </li>
          <li>
            <Link to="/watchlist" className="text-blue-500 hover:underline">Manage Watchlist</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;