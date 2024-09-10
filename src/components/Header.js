import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/auth';
import { BiMoviePlay } from "react-icons/bi";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { TiClipboard } from "react-icons/ti";
import { IoLogOutOutline } from "react-icons/io5";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import logo from '../img/cinewatch.png';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const MenuItems = () => (
    <>
      {isAuthenticated() ? (
        <>
          <li><Link to="/browse" className="block w-full text-center hover:text-red-600 text-lg transition-all duration-200 px-2 py-1" onClick={() => setIsMenuOpen(false)}>
            <BiMoviePlay className="inline-block mr-2"/>
            Browse
          </Link></li>
          <li>
            <Link to="/dashboard" className="block w-full text-center hover:text-red-600 text-lg transition-all duration-200 px-2 py-1" onClick={() => setIsMenuOpen(false)}>
              <RiDashboardHorizontalLine className="inline-block mr-2"/>
              Dashboard
            </Link>
          </li>
          <li><Link to="/watchlist" className="block w-full text-center hover:text-red-600 text-lg transition-all duration-200 px-2 py-1" onClick={() => setIsMenuOpen(false)}>
            <TiClipboard className="inline-block mr-2"/>
            Watchlist
          </Link></li>
          <li><button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-center hover:text-black text-lg transition-all duration-200 bg-red-600 px-2 py-1">
            <IoLogOutOutline className="inline-block mr-2"/>
            Logout
          </button></li>
        </>
      ) : (
        <>
          <li><Link to="/register" className="block w-full text-center px-4 py-1 rounded-lg border-[1px]  border-red-600  hover:bg-red-600 font-semibold  text-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
            Register
          </Link></li>
          <li><Link to="/login" className="block w-full text-center px-4 py-1 rounded-lg border-[1px] border-red-600 hover:bg-black bg-red-600 text-lg font-semibold transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link></li>
        </>
      )}
    </>
  );

  return (
    <header className="bg-black text-white relative z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl hover:opacity-60 transition-all duration-100 z-50">
          <img src={logo} alt="CineWatch" className="h-12 inline-block mr-2"/>
        </Link>
       
        {/* Hamburger menu for mobile */}
        <div className="lg:hidden z-50">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden lg:flex space-x-2">
          <MenuItems />
        </ul>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden fixed inset-0 bg-black z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col justify-center h-full">
          <ul className="flex flex-col items-center space-y-6">
            <MenuItems />
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;