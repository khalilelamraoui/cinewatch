import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/cinewatch.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-10 pb-6 px-4 font-work-sans">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-3xl hover:opacity-60 transition-all duration-100 z-50">
              <img src={logo} alt="CineWatch" className="h-12 inline-block mr-2"/>
            </Link>
            <p className="text-gray-400 text-lg mt-2">Your Next Movie, One List Away.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-600">Company</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Pricings</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Terms</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-600">Support</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Report Bug</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Contact us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-600">About</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">Our Team</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Our Mission</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Our Story</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-red-600 text-center text-gray-400">
          <p>&copy; {currentYear} Cinewatch. All rights reserved.
            
            <div className='inline-flex items-center gap-2 ms-4'>
              <p className="text-gray-400">Powered By</p>
                <img src="https://intranet.alxswe.com/assets/holberton-logo-full-alx-d053727941512ebe04b797ca87d81a195004e9ff2d8a6aedf4004c5365cf8944.png"
                  alt="ALX" 
                  className="h-8 inline-block mr-2 rounded-lg bg-white"
                />
            </div>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;