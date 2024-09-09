import React, { useState, useEffect } from 'react';
import { getWatchlist } from '../services/localStorage';
import WatchlistItem from '../components/WatchlistItem';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const handleRemove = (movieId) => {
    setWatchlist(watchlist.filter(movie => movie.id !== movieId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty. Start browsing movies to add some!</p>
      ) : (
        <div className="flex items-center gap-4 flex-wrap">
          {watchlist.map(movie => (
            <WatchlistItem key={movie.id} movie={movie} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;