import React from 'react';
import { removeFromWatchlist } from '../services/localStorage';

function WatchlistItem({ movie, onRemove }) {
  const handleRemove = () => {
    if (removeFromWatchlist(movie.id)) {
      onRemove(movie.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="w-32 h-48 object-cover"
      />
      <div className="p-4 flex-grow">
        <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
        <p className="text-gray-600 mb-4">{movie.release_date}</p>
        <button
          onClick={handleRemove}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Remove from Watchlist
        </button>
      </div>
    </div>
  );
}

export default WatchlistItem;