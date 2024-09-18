import React, { useState, useEffect } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';


const WatchlistButton = ({ initialInWatchlist, onToggle }) => {
  // State to track if the item is in the watchlist
  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist);
  
  // State to track if the button has been clicked for visual feedback
  const [isClicked, setIsClicked] = useState(false);

  // Update the inWatchlist state when the initialInWatchlist prop changes
  useEffect(() => {
    setInWatchlist(initialInWatchlist);
  }, [initialInWatchlist]);

  // Toggles the watchlist status and provides visual feedback on button click.
  const handleWatchlistToggle = () => {
    setIsClicked(true);
    onToggle(); 

    // Reset the visual feedback state after 1 second
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
      {/* Display different icons and text based on watchlist status */}
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
