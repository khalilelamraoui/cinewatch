import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/auth';
import { BiMoviePlay } from "react-icons/bi";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { TiClipboard } from "react-icons/ti";
import { IoLogOutOutline } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import logo from '../img/cinewatch.png';

function Header() {
  const navigate = useNavigate();
    
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-black text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl hover:opacity-60 transition-all duration-100">
          <img src={logo} alt="CineWatch" className="h-12 inline-block mr-2"/>
          
          {/* <span className='text-red-700'>Cine</span>
          Watch */}
        </Link>
        
        <ul className="flex space-x-4">
          {isAuthenticated() ? (
            <>
              <li><Link to="/browse" className="hover:text-red-600 text-xl transition-all duration-200 inline-flex items-center gap-1">
                <BiMoviePlay/>
                Browse</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-red-600 text-xl transition-all duration-200 inline-flex items-center gap-1">
                    <RiDashboardHorizontalLine/>
                    Dashboard</Link>
              </li>
              <li><Link to="/watchlist" className="hover:text-red-600 text-xl transition-all duration-200 inline-flex items-center gap-1">
                <TiClipboard/>
                Watchlist</Link>
              </li>
              <li><button onClick={handleLogout} className="hover:text-red-600 text-xl transition-all duration-200 inline-flex items-center gap-1">
                <IoLogOutOutline/>
                Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-red-600 text-xl font-semibold transition-all duration-200">
                Login</Link>
              </li>
              <li className=''><Link to="/register" className="hover:bg-red-900 font-semibold bg-red-600 px-4 py-2 rounded-lg text-xl transition-all duration-200">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;