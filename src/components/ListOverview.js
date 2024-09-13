import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline, MdPlaylistAdd, MdArrowForward } from "react-icons/md";
import { getWatchlist, toggleWatchedStatus } from '../services/auth';
import WatchlistItem from './WatchlistItem';

const ListCover = ({ movies }) => {
  const coverMovies = movies.slice(0, 3);

  return (
    <div className="relative w-full h-64 bg-gray-200 rounded-t-lg overflow-hidden">
      {coverMovies.map((movie, index) => (
        <div
          key={movie.id}
          className="absolute w-full h-full"
          style={{
            top: `${index * 10}%`,
            left: `${index * 5}%`,
            zIndex: 3 - index,
            transform: `rotate(${index * 2}deg)`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
      ))}
      {movies.length > 3 && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
          +{movies.length - 3} more
        </div>
      )}
    </div>
  );
};

function ListOverview() {
    const [lists, setLists] = useState([
      { id: 'watchlist', name: 'Watchlist', movies: [] },
      { id: 'watched', name: 'Watched', movies: [] }
    ]);
    const [newListName, setNewListName] = useState('');
    const [showNewListForm, setShowNewListForm] = useState(false);
  
    useEffect(() => {
      const allMovies = getWatchlist();
      const watchlistMovies = allMovies.filter(movie => !movie.watched);
      const watchedMovies = allMovies.filter(movie => movie.watched);
      
      setLists(prevLists => [
        { ...prevLists[0], movies: watchlistMovies },
        { ...prevLists[1], movies: watchedMovies },
        ...prevLists.slice(2)
      ]);
    }, []);

  const handleCreateList = () => {
    if (newListName.trim()) {
      const newList = {
        id: `list-${Date.now()}`,
        name: newListName.trim(),
        movies: []
      };
      setLists(prevLists => [...prevLists, newList]);
      setNewListName('');
      setShowNewListForm(false);
    }
  };

  const handleDeleteList = (listId) => {
    setLists(prevLists => prevLists.filter(list => list.id !== listId));
  };

  const handleRemoveMovie = (listId, movieId) => {
    setLists(prevLists => 
      prevLists.map(list => 
        list.id === listId 
          ? { ...list, movies: list.movies.filter(movie => movie.id !== movieId) }
          : list
      )
    );
  };

  const handleToggleWatched = (listId, movieId) => {
    if (toggleWatchedStatus(movieId)) {
      setLists(prevLists =>
        prevLists.map(list => {
          if (list.id === 'watchlist' || list.id === 'watched') {
            const updatedMovies = list.movies.filter(movie => movie.id !== movieId);
            return { ...list, movies: updatedMovies };
          }
          return list;
        })
      );

      // Fetch the updated watchlist
      const updatedWatchlist = getWatchlist();
      const watchlistMovies = updatedWatchlist.filter(movie => !movie.watched);
      const watchedMovies = updatedWatchlist.filter(movie => movie.watched);

      setLists(prevLists => [
        { ...prevLists[0], movies: watchlistMovies },
        { ...prevLists[1], movies: watchedMovies },
        ...prevLists.slice(2)
      ]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Lists</h1>
        <button 
          onClick={() => setShowNewListForm(!showNewListForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <MdPlaylistAdd className="mr-2" /> Create New List
        </button>
      </div>

      {showNewListForm && (
        <div className="mb-4 flex">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Enter list name"
            className="border p-2 mr-2 flex-grow"
          />
          <button 
            onClick={handleCreateList}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map(list => (
          <div key={list.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <ListCover movies={list.movies} />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{list.name}</h2>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-600">{list.movies.length} movies</span>
                  {list.id !== 'watchlist' && list.id !== 'watched' && (
                    <button 
                      onClick={() => handleDeleteList(list.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <MdDeleteOutline />
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-4 space-y-4">
                {list.movies.slice(0, 3).map(movie => (
                  <WatchlistItem
                    key={movie.id}
                    movie={movie}
                    onRemove={(movieId) => handleRemoveMovie(list.id, movieId)}
                    onToggleWatched={(movieId) => handleToggleWatched(list.id, movieId)}
                    showWatchedToggle={list.id === 'watchlist'}
                  />
                ))}
              </div>
              <Link 
                to={`/list/${list.id}`}
                className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-600"
              >
                View All <MdArrowForward className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOverview;