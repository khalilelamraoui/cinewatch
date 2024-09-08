import React, { useState, useEffect } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';

const WatchlistButton = ({ initialInWatchlist, onToggle }) => {
  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setInWatchlist(initialInWatchlist);
  }, [initialInWatchlist]);

  const handleWatchlistToggle = () => {
    setIsClicked(true);
    onToggle();

    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  const getButtonColor = () => {
    if (isClicked) return 'bg-green-600 hover:bg-green-700';
    return inWatchlist ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';
  };

  return (
    <button
      onClick={handleWatchlistToggle}
      className={`${getButtonColor()} text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105`}
    >
      {inWatchlist ? (
        <>
          <FaCheck className="mr-2" />
          In Watchlist
        </>
      ) : (
        <>
          <FaPlus className="mr-2" />
          Add to Watchlist
        </>
      )}
    </button>
  );
};

export default WatchlistButton;