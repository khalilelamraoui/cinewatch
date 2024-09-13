import React, { useState, useEffect } from 'react';
import { getCurrentUser, getWatchlist, toggleWatchedStatus } from '../services/auth';
import { MdDeleteOutline, MdPlaylistAdd, MdList, MdArrowForward } from "react-icons/md";
import { Link } from 'react-router-dom';

const ListCover = ({ movies }) => {
  // Select up to 3 movies for the cover
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

function Watchlist() {
  const [lists, setLists] = useState([
    { id: 'watchlist', name: 'Watchlist', movies: [] },
    { id: 'watched', name: 'Watched', movies: [] }
  ]);
  const [newListName, setNewListName] = useState('');
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMoveToMenu, setShowMoveToMenu] = useState(false);

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

  const handleMoveToList = (movieId, sourceListId, targetListId) => {
    setLists(prevLists => {
      const sourceList = prevLists.find(list => list.id === sourceListId);
      const movieToMove = sourceList.movies.find(movie => movie.id === movieId);
      
      return prevLists.map(list => {
        if (list.id === sourceListId) {
          return { ...list, movies: list.movies.filter(movie => movie.id !== movieId) };
        }
        if (list.id === targetListId) {
          return { ...list, movies: [...list.movies, movieToMove] };
        }
        return list;
      });
    });
    setShowMoveToMenu(false);
    setSelectedMovie(null);
  };

  const handleDeleteList = (listId) => {
    setLists(prevLists => prevLists.filter(list => list.id !== listId));
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
              <Link 
                to={`/list/${list.id}`}
                className="mt-2 inline-flex items-center text-blue-500 hover:text-blue-600"
              >
                View List <MdArrowForward className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Move "{selectedMovie.title}" to:</h3>
            {lists.filter(list => list.id !== selectedMovie.currentList).map(list => (
              <button
                key={list.id}
                onClick={() => handleMoveToList(selectedMovie.id, selectedMovie.currentList, list.id)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {list.name}
              </button>
            ))}
            <button 
              onClick={() => setSelectedMovie(null)}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;