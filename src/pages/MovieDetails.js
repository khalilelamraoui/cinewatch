import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieVideos } from '../services/api';
import { addToWatchlist, removeFromWatchlist } from '../services/localStorage';
import { FaStar, FaClock, FaCalendarAlt, FaPlus, FaCheck, FaPlay } from 'react-icons/fa';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [details, credits, videos] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id)
        ]);
        setMovie(details);
        setCredits(credits);
        setVideos(videos.results);
        
        // Check if the movie is in the watchlist
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setInWatchlist(watchlist.includes(details.id));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError('Failed to fetch movie data. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleWatchlistToggle = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    if (inWatchlist) {
      const updatedWatchlist = watchlist.filter(movieId => movieId !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
      watchlist.push(movie.id);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }

    setIsClicked(true);
    setInWatchlist(!inWatchlist);

    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  const getButtonColor = () => {
    if (isClicked) return 'bg-green-600 hover:bg-green-700';
    return inWatchlist ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!movie) {
    return <div className="flex justify-center items-center h-screen">No movie details found.</div>;
  }

  const trailer = videos.find(video => video.type === 'Trailer');

  return (
    <div className="relative">
      <div 
        className="absolute inset-0 blur-sm bg-cover bg-center z-0"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
          
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
            
            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleWatchlistToggle}
                className={`${getButtonColor()} text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105`}
              >
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
              
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <FaPlay className="mr-2" />
                  Watch Trailer
                </a>
              )}
            </div>
            
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
            
            {credits && credits.cast && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Top Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {credits.cast.slice(0, 8).map(actor => (
                    <div key={actor.id} className="flex flex-col items-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        className="w-24 h-24 object-cover rounded-full mb-2"
                      />
                      <span className="text-center font-semibold">{actor.name}</span>
                      <span className="text-center text-sm text-gray-300">{actor.character}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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