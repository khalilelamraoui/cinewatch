import React, { useState, useEffect } from 'react';
import { removeFromWatchlist } from '../services/localStorage';
import { getCurrentUser, getWatchlist, toggleWatchedStatus } from '../services/auth';
import './MovieCard.css';
import { MdDeleteOutline } from "react-icons/md";

function WatchlistItem({ movie, onRemove }) {

  // Get current user and watchlist state
  const user = getCurrentUser();
  const [watchlist, setWatchlist] = useState([]);

  // Fetch the watchlist when the component mounts
  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  // Calculate total movies, watched count, and remaining count
  const totalMovies = watchlist.length;
  const watchedCount = watchlist.filter(movie => movie.watched).length;
  const remainingCount = totalMovies - watchedCount;
  const allMovies = watchlist;

  // Handles the removal of a movie from the watchlist.
  const handleRemove = () => {
    if (removeFromWatchlist(movie.id)) {
      onRemove(movie.id);
    }
  };
  //Toggles the watched status of a movie and updates the watchlist.
  const handleToggleWatched = (movieId) => {
    if (toggleWatchedStatus(movieId)) {
      setWatchlist(getWatchlist());
    }
  };

  return (
    <>
    {/* Back-up */}
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
      {watchlist.map(movie => (
        <div key={movie.id} className="flex flex-col">
          <div className="card">
            {/* Display the movie poster image */}
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="info">
              {/* Display the movie title */}
              <h1 className='text-xl font-semibold'>{movie.title}</h1>
              <p>
                {movie.overview.length > 100
                  ? movie.overview.substring(0, 100) + '...'
                  : movie.overview}
              </p>
               {/* Button to remove the movie from watchlist */}
              <button onClick={handleRemove} className='mt-4 inline-flex gap-2 items-center hover:bg-red-600'>
                  <span className='text-xl'>
                  <MdDeleteOutline/>
                  </span>
                  <span className='text-sm'>
                    Remove
                  </span>
              </button>
              {/* Button to mark movie as watched or unmark it */}
              <button 
                onClick={() => handleToggleWatched(movie.id)}
                className={`mt-3 px-3 py-1 rounded text-xs ${movie.watched ? '!bg-green-500' : '!bg-white'} text-white w-full !hover:bg-green-500`}
              >
                {movie.watched ? 'Watched' : 'Mark as Watched'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
    
    
  );
}

export default WatchlistItem;