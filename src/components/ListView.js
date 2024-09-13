import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdArrowBack, MdDelete, MdCheckCircle } from "react-icons/md";
import { getWatchlist, toggleWatchedStatus } from '../services/auth';

function ListView() {
  const { listId } = useParams();
  const [list, setList] = useState(null);

  useEffect(() => {
    const allMovies = getWatchlist();
    if (listId === 'watchlist') {
      setList({
        id: 'watchlist',
        name: 'Watchlist',
        movies: allMovies.filter(movie => !movie.watched)
      });
    } else if (listId === 'watched') {
      setList({
        id: 'watched',
        name: 'Watched Movies',
        movies: allMovies.filter(movie => movie.watched)
      });
    } else {
      // For custom lists, you'd need to implement a way to fetch or store these
      // This is a placeholder for demonstration
      setList({
        id: listId,
        name: `Custom List ${listId}`,
        movies: []
      });
    }
  }, [listId]);

  const handleToggleWatched = (movieId) => {
    if (toggleWatchedStatus(movieId)) {
      setList(prevList => ({
        ...prevList,
        movies: prevList.movies.map(movie =>
          movie.id === movieId ? { ...movie, watched: !movie.watched } : movie
        )
      }));
    }
  };

  const handleRemoveFromList = (movieId) => {
    setList(prevList => ({
      ...prevList,
      movies: prevList.movies.filter(movie => movie.id !== movieId)
    }));
    // You would also need to implement this in your auth service
  };

  if (!list) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/list-overview" className="flex items-center text-blue-500 hover:text-blue-600 mb-4">
        <MdArrowBack className="mr-2" /> Back to Lists
      </Link>
      <h1 className="text-3xl font-bold mb-6">{list.name}</h1>
      {list.movies.length === 0 ? (
        <p>This list is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.movies.map(movie => (
            <div key={movie.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-xl mb-2 truncate">{movie.title}</h2>
                <p className="text-gray-700 text-sm mb-4 truncate">{movie.overview}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleRemoveFromList(movie.id)}
                    className="text-red-500 hover:text-red-600 flex items-center"
                  >
                    <MdDelete className="mr-1" /> Remove
                  </button>
                  {listId === 'watchlist' && (
                    <button
                      onClick={() => handleToggleWatched(movie.id)}
                      className="text-green-500 hover:text-green-600 flex items-center"
                    >
                      <MdCheckCircle className="mr-1" /> Mark as Watched
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListView;