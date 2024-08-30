import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { FaStar, FaClock, FaCalendarAlt } from 'react-icons/fa';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const details = await getMovieDetails(id);
        setMovie(details);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to fetch movie details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!movie) {
    return <div className="flex justify-center items-center h-screen">No movie details found.</div>;
  }

  return (
    <div className="relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 blur-sm bg-cover bg-center z-0"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
          
          {/* Details */}
          <div className="md:w-2/3 text-white">
            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="flex items-center font-semibold">
                <FaStar className="text-yellow-400 mr-1" />
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="flex items-center font-semibold">
                <FaClock className="mr-1" />
                {movie.runtime} min
              </span>
              <span className="flex items-center font-semibold">
                <FaCalendarAlt className="mr-1" />
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
            
            <p className="text-xl italic mb-6">{movie.overview}</p>
            
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-xl">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Production Companies</h2>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.map(company => (
                    <div key={company.id} className="flex items-center bg-gray-200 backdrop-blur-sm rounded-lg px-2 py-1">
                      {company.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          className="w-10 h-10 object-contain mr-2"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-700 rounded-full mr-2"></div>
                      )}
                      <span className='text-black font-semibold'>{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;