import React from 'react';
import { removeFromWatchlist } from '../services/localStorage';
import { Link } from 'react-router-dom';
import './MovieCard.css';
import { MdOutlineLibraryAdd } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

function WatchlistItem({ movie, onRemove }) {
  const handleRemove = () => {
    if (removeFromWatchlist(movie.id)) {
      onRemove(movie.id);
    }
  };

  return (
    <>
      {/* <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
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
      </div> */}
      <div to={`/movie/${movie.id}`} className="card">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="info">
          <h1 className='text-xl font-semibold'>{movie.title}</h1>
          <p>
            {movie.overview.length > 100
              ? movie.overview.substring(0, 100) + '...'
              : movie.overview}
          </p>
          <button onClick={handleRemove} className='mt-4 inline-flex gap-2 items-center'>
              <span className='text-xl'>
              <MdDeleteOutline/>
              </span>
              <span className='text-sm'>
                Remove
              </span>
          </button>
        </div>
      </div>
    </>
    
    
  );
}

export default WatchlistItem;