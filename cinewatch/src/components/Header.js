import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/auth';
import { BiMoviePlay } from "react-icons/bi";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { TiClipboard } from "react-icons/ti";
import { IoLogOutOutline } from "react-icons/io5";

function Header() {
  const navigate = useNavigate();
    
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Watchlist Maker</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-300 inline-flex items-center gap-1">
            <BiMoviePlay/>
            Browse</Link>
          </li>
          {isAuthenticated() ? (
            <>
              <li>
                <Link to="/dashboard" className="hover:text-gray-300 inline-flex items-center gap-1">
                    <RiDashboardHorizontalLine/>
                    Dashboard</Link>
              </li>
              <li><Link to="/watchlist" className="hover:text-gray-300 inline-flex items-center gap-1">
                <TiClipboard/>
                Watchlist</Link>
              </li>
              <li><button onClick={handleLogout} className="hover:text-gray-300 inline-flex items-center gap-1">
                <IoLogOutOutline/>
                Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
              <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;