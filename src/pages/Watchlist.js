import React, { useState, useEffect } from 'react';
import { getCurrentUser, getWatchlist, toggleWatchedStatus } from '../services/auth';
import WatchlistItem from '../components/WatchlistItem';
import { MdDeleteOutline } from "react-icons/md";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const handleRemove = (movieId) => {
    setWatchlist(watchlist.filter(movie => movie.id !== movieId));
  };
  
  const handleToggleWatched = (movieId) => {
    if (toggleWatchedStatus(movieId)) {
      setWatchlist(getWatchlist());
    }
  };

  const watchlistReverse = watchlist.slice().reverse();

  return (
    <div className='container-fluid relative'>
      <div className='absolute inset-0 bg-no-repeat bg-cover bg-center z-[-1] ' style={{backgroundImage: `url('https://i.ytimg.com/vi/WV4t0MkDGEQ/maxresdefault.jpg')`}}></div>
        <div className='w-full bg-black bg-opacity-70 backdrop-blur-sm'>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl text-white font-bold mb-8">My Watchlist</h1>
            {watchlistReverse.length === 0 ? (
              <p>Your watchlist is empty. Start browsing movies to add some!</p>
            ) : (
              <div className="flex items-center gap-4 flex-wrap">
                {watchlist.map(movie => (
                  <div key={movie.id} className="flex flex-col">
                    <div className="card">
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
                        <button onClick={handleRemove} className='mt-4 inline-flex gap-2 items-center hover:bg-red-600 bg-white text-black hover:text-white'>
                            <span className='text-xl'>
                            <MdDeleteOutline/>
                            </span>
                            <span className='text-sm'>
                              Remove
                            </span>
                        </button>
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