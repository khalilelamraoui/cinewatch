import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../img/bg.jpg';
import { BiMoviePlay, BiListUl, BiTrendingUp, BiUserCircle, BiChevronLeft, BiChevronRight, BiChevronDown } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

const API_KEY = 'ee556e88ca03d6d73df9c6cf5f90d3d2';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const fetchMovies = async (type) => {
  const endpoint = type === 'popular' 
    ? `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    : `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.results.slice(0, 15); 
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

const MovieSection = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="my-8 relative">
      <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          <BiChevronLeft size={24} />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map(movie => (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="relative flex-shrink-0" style={{ width: '200px' }}>
              <div className="relative group">
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs rounded-full px-2 py-1 flex items-center">
                  <FaStar size={14} className="mr-1" />
                  {movie.vote_average.toFixed(1)}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <p className="text-white text-sm">More Info</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-white text-center truncate">{movie.title}</p>
            </Link>
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          <BiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default function Homepage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const popular = await fetchMovies('popular');
      const latest = await fetchMovies('latest');
      setPopularMovies(popular);
      setLatestMovies(latest);
    };
    loadMovies();
  }, []);

  return (
    <div className="min-h-screen bg-black" style={{backgroundImage: `linear-gradient(to top, #330e0e, #000000, #af1717)`}}>
      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-screen flex flex-col justify-center items-center text-white relative"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})` }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Your Personal <span className="text-red-600">Cinema</span> Companion
          </h1>
          <p className='text-xl sm:text-2xl mb-8 max-w-2xl mx-auto'>
            Discover, track, and enjoy your favorite movies with CineWatch
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 max-w-4xl mx-auto">
            <FeatureItem icon={<BiMoviePlay size={40} />} text="Vast Library of Content" />
            <FeatureItem icon={<BiListUl size={40} />} text="Personalized Watchlists" />
            <FeatureItem icon={<BiTrendingUp size={40} />} text="Latest Releases & Trends" />
            <FeatureItem icon={<BiUserCircle size={40} />} text="Community Reviews" />
          </div>
          <Link 
            to="/browse" 
            className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-3 px-8 rounded-full transition duration-300 inline-block animate-pulse hover:animate-none"
          >
            Start Exploring
          </Link>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
          <div className="text-3xl animate-bounce">
            <BiChevronDown />
          </div>
          <p className="text-sm">Scroll Down</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8">
        <MovieSection title="Popular Movies" movies={popularMovies} />
        <MovieSection title="Latest Releases" movies={latestMovies} />
      </div>
    </div>
  );
}

const FeatureItem = ({ icon, text }) => (
  <div className="flex flex-col items-center">
    <div className="text-red-500 mb-2">
      {icon}
    </div>
    <p className="text-sm sm:text-base">{text}</p>
  </div>
);
