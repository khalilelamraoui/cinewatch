import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addToWatchlist } from '../services/localStorage';
import './MovieCard.css';
import { MdOutlineLibraryAdd } from "react-icons/md";

function MovieCard({ movie }) {
  // Hook for navigation
  const navigate = useNavigate();


  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    
    // Attempt to add the movie to the watchlist
    if (addToWatchlist(movie)) {
      alert('Added to watchlist!');
    } else {
      // Handle the case where the movie is already in the watchlist
      if (!localStorage.getItem('user')) {
        alert('Please log in to add movies to your watchlist.');
        navigate('/login');
        return;
      } else {
        alert('Movie is already in your watchlist.');
      }
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="card">
      {/* Movie poster image */}
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="info">
        {/* Movie title */}
        <h1 className='text-xl font-semibold'>{movie.title}</h1>
        {/* Movie overview (truncated if longer than 100 characters) */}
        <p>
          {movie.overview.length > 100
            ? movie.overview.substring(0, 100) + '...'
            : movie.overview}
        </p>
        {/* Button to add the movie to the watchlist */}
        <button onClick={handleAddToWatchlist} className='mt-4 inline-flex gap-2 items-center hover:bg-red-600 bg-white text-black hover:text-white'>
            <span className='text-xl'>
                <MdOutlineLibraryAdd />
            </span>
            <span className='text-sm'>
                Add to List
            </span>
        </button>
      </div>
    </Link>
  );
}

export default MovieCard;