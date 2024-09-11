import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../img/bg.jpg';
import { BiMoviePlay } from "react-icons/bi";

export default function Homepage() {
    return (
        <div 
          className="bg-cover bg-bottom h-[93vh] flex flex-col justify-center items-center text-center text-white"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <h1 className="text-6xl -mt-20 font-bold mb-6 xl:w-1/3 w-full shadow-lg-text lg:leading-snug">
            The Best Content<br/> At <span className="text-red-600">One Place</span>
          </h1>
          <p className='text-xl opacity-80'>
            Connect with 60,000 users into our massive collection of shows
          </p>
          <button 
            className="text-xl hover:text-gray-300 hover:-translate-y-1 transition-all duration-200 mt-8 bg-red-700 shadow-lg text-white rounded-full"
          >
              <Link to="/browse" className=" px-6 py-3 font-semibold inline-flex items-center gap-1">
                
                Get Started
              </Link>
          </button>
          {/* <input 
            type="text" 
            placeholder="Search for Movies, Shows, TV Series or Genres" 
            className="mt-4 p-3 rounded-lg text-black" 
          /> */}
        </div>
    )
}