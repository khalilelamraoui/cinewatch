import React from 'react';
import { MdDeleteOutline, MdCheckCircle } from "react-icons/md";

function WatchlistItem({ movie, onRemove, onToggleWatched, showWatchedToggle = false }) {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
        alt={movie.title}
        className="w-16 h-24 object-cover rounded"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-500">{movie.release_date.split('-')[0]}</p>
      </div>
      <div className="flex items-center space-x-2">
        {showWatchedToggle && (
          <button
            onClick={() => onToggleWatched(movie.id)}
            className={`p-2 rounded ${movie.watched ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <MdCheckCircle />
          </button>
        )}
        <button
          onClick={() => onRemove(movie.id)}
          className="p-2 rounded bg-red-500 text-white"
        >
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
}

export default WatchlistItem;