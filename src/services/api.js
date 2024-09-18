import axios from 'axios'; // Import axios for making HTTP requests

// API key and base URL for The Movie Database API
const API_KEY = 'ee556e88ca03d6d73df9c6cf5f90d3d2';
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Searches for movies based on a query string.
 * 
 * @param {string} query - The search query string.
 * @param {number} [page=1] - The page number of results to retrieve.
 * @returns {Promise<Object>} - The response data containing search results.
 */
export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });
  return response.data;
};

/**
 * Retrieves a list of popular movies.
 * 
 * @param {number} [page=1] - The page number of results to retrieve.
 * @param {string} [sortBy='popularity.desc'] - The sorting criteria for the results.
 * @returns {Promise<Object>} - The response data containing popular movies.
 */
export const getPopularMovies = async (page = 1, sortBy = 'popularity.desc') => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      page,
      sort_by: sortBy,
    },
  });
  return response.data;
};

/**
 * Retrieves detailed information about a specific movie.
 * 
 * @param {number} movieId - The ID of the movie to retrieve details for.
 * @returns {Promise<Object>} - The response data containing movie details.
 */
export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};

/**
 * Retrieves movies based on a specific genre.
 * 
 * @param {number} genreId - The ID of the genre to filter movies by.
 * @param {number} [page=1] - The page number of results to retrieve.
 * @param {string} [sortBy='popularity.desc'] - The sorting criteria for the results.
 * @returns {Promise<Object>} - The response data containing movies of the specified genre.
 */
export const getMoviesByGenre = async (genreId, page = 1, sortBy = 'popularity.desc') => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: genreId,
      page,
      sort_by: sortBy,
    },
  });
  return response.data;
};

/**
 * Retrieves a list of movie genres.
 * 
 * @returns {Promise<Array>} - The response data containing a list of genres.
 */
export const getGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.genres;
};

/**
 * Retrieves the credits (cast and crew) for a specific movie.
 * 
 * @param {number} movieId - The ID of the movie to retrieve credits for.
 * @returns {Promise<Object>} - The response data containing movie credits.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const getMovieCredits = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie credits');
  }
  return response.json();
};

/**
 * Retrieves videos (trailers, clips) for a specific movie.
 * 
 * @param {number} movieId - The ID of the movie to retrieve videos for.
 * @returns {Promise<Object>} - The response data containing movie videos.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const getMovieVideos = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie videos');
  }
  return response.json();
};
