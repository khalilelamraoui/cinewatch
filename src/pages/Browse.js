import React, { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies, getMoviesByGenre, getGenres } from '../services/api';
import MovieCard from '../components/MovieCard';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Movies</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="wrapper">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Browse;