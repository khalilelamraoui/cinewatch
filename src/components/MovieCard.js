// src/components/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { addToWatchlist } from '../services/localStorage';
import './MovieCard.css';
import { MdOutlineLibraryAdd } from "react-icons/md";

function MovieCard({ movie }) {
  const handleAddToWatchlist = (e) => {
    e.preventDefault(); // Prevent the link from being followed
    if (addToWatchlist(movie)) {
      alert('Added to watchlist!');
    } else {
      alert('Movie is already in your watchlist or you\'re not logged in.');
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="card">
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
        <button onClick={handleAddToWatchlist} className='mt-4 inline-flex gap-2 items-center'>
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