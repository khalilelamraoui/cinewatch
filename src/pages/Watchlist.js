import React, { useState, useEffect } from 'react';
import { getCurrentUser, getWatchlist, toggleWatchedStatus } from '../services/auth';
import { removeFromWatchlist } from '../services/localStorage';
import WatchlistItem from '../components/WatchlistItem';
import { MdDeleteOutline } from "react-icons/md";

function Watchlist() {
  // State to hold the user's watchlist movies
  const [watchlist, setWatchlist] = useState([]);

  // Fetch and set the watchlist when the component mounts
  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);
  
  // Function to reload and refresh the watchlist state
  const loadWatchlist = () => {
    setWatchlist(getWatchlist());
  };

  // Handle removing a movie from the watchlist
  const handleRemove = (movieId) => {
    if (removeFromWatchlist(movieId)) {
      loadWatchlist();
    }
  };
  
  // Toggle the watched status of a movie
  const handleToggleWatched = (movieId) => {
    if (toggleWatchedStatus(movieId)) {
      setWatchlist(getWatchlist());
    }
  };
  // Reverse the order of the watchlist for display
  const watchlistReverse = watchlist.slice().reverse();

  return (
    <div className='container-fluid relative'>
      {/* Background image */}
      <div className='absolute inset-0 bg-no-repeat bg-cover bg-center z-[-1] ' style={{backgroundImage: `url('https://i.ytimg.com/vi/WV4t0MkDGEQ/maxresdefault.jpg')`}}></div>
        {/* Overlay and content container */}
        <div className='w-full bg-black bg-opacity-70 backdrop-blur-sm'>
          <div className="container mx-auto px-4 py-8 min-h-[90vh]">
            <h1 className="text-3xl text-white font-bold mb-8">My Watchlist</h1>
            {/* If the watchlist is empty, show a message */}
            {watchlistReverse.length === 0 ? (
              <p className='text-white'>Your watchlist is empty. Start browsing movies to add some!</p>
            ) : (
              <div className="flex items-center gap-4 flex-wrap">
                {watchlist.map(movie => (
                  <div key={movie.id} className="flex flex-col">
                    <div className="card">
                      {/* Movie poster */}
                      <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                      {/* Movie information */}
                      <div className="info">
                        <h1 className='text-xl font-semibold'>{movie.title}</h1>
                        <p>
                          {movie.overview.length > 100
                            ? movie.overview.substring(0, 100) + '...'
                            : movie.overview}
                        </p>
                        {/* Button to remove the movie from the watchlist */}
                        <button onClick={() => handleRemove(movie.id)} className='mt-4 inline-flex gap-2 items-center hover:bg-red-600 bg-white text-black hover:text-white'>
                            <span className='text-xl'>
                            <MdDeleteOutline/>
                            </span>
                            <span className='text-sm'>
                              Remove
                            </span>
                        </button>
                        {/* Button to toggle the "watched" status of the movie */}
                        <button 
                          onClick={() => handleToggleWatched(movie.id)}
                          className={`mt-3 px-3 py-1 rounded text-xs ${movie.watched ? '!bg-green-500 hover:!bg-red-600' : '!bg-white'} hover:!text-white text-black w-full hover:!bg-green-500`}
                        >
                          {movie.watched ? 'Watched' : 'Mark as Watched'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
      </div>
    </div>
  );
}

export default Watchlist;