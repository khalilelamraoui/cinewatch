import React, { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies, getMoviesByGenre, getGenres } from '../services/api';
import MovieCard from '../components/MovieCard';
import loginBg from '../img/loginbg.jpg';

function Browse() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, sortBy, page]);

  const fetchGenres = async () => {
    try {
      const genreList = await getGenres();
      setGenres(genreList);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let data;
      if (searchQuery) {
        data = await searchMovies(searchQuery, page);
      } else if (selectedGenre) {
        data = await getMoviesByGenre(selectedGenre, page, sortBy);
      } else {
        data = await getPopularMovies(page, sortBy);
      }
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSelectedGenre('');
    setPage(1);
    await fetchMovies();
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setSearchQuery('');
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className='container-fluid relative'>
      <div className='absolute inset-0 bg-no-repeat bg-cover bg-center z-[-1] ' style={{backgroundImage: `url('https://i.ytimg.com/vi/WV4t0MkDGEQ/maxresdefault.jpg')`}}></div>
      <div className='w-full bg-black bg-opacity-70 backdrop-blur-sm'>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-black bg-opacity-70 shadow-lg p-6 mb-4 rounded-lg">
            <h1 className="text-3xl text-white font-bold mb-8">Browse Movies</h1>
            <form onSubmit={handleSearch} className="mb-2 flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-1/2 p-2 border rounded"
              />
              <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                Search
              </button>
            </form>
            <div className="mb-8 flex space-x-4">
              <select
                value={selectedGenre}
                onChange={handleGenreChange}
                className="p-2 border rounded"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="p-2 border rounded"
              >
                <option value="popularity.desc">Popularity Descending</option>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="vote_average.desc">Rating Descending</option>
                <option value="vote_average.asc">Rating Ascending</option>
                <option value="release_date.desc">Release Date Descending</option>
                <option value="release_date.asc">Release Date Ascending</option>
              </select>
            </div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="bg-black bg-opacity-70 wrapper  py-4 rounded-lg">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              <div className="mt-8 flex justify-center items-center space-x-4">
                <button
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 font-bold rounded bg-gray-200 hover:bg-red-600 disabled:opacity-50 hover:text-white transition-all duration-200"
                >
                  &#11104; {/* Left arrow */}
                </button>
                <span className="text-white">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 font-bold rounded bg-gray-200 hover:bg-red-600 disabled:opacity-50 hover:text-white transition-all duration-200"
                >
                  &#11106; {/* Right arrow */}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Browse;