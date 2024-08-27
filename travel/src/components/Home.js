import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/useAuth'; // Adjust path if needed

const Home = () => {
    const { user, logout } = useAuth(); // Use the useAuth hook to get the current user and logout function
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <div>
            <h1 className='text-4xl ml-4'>Travel Itinerary Planner</h1>
            <p className='text-xl ml-4'>Welcome to the Travel Itinerary Planner App! Plan your trips and organize your travel activities.</p>
            {!user ? (
                <>
                    <div className='flex gap-4 m-4'>
                        <button className="btn px-4 py-2 rounded bg-slate-600">
                            <Link to="/login" className='font-bold text-white'>Login</Link>
                        </button>
                        <button className="btn px-4 py-2 rounded bg-slate-600">
                            <Link to="/register" className='font-bold text-white'>Register</Link>
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <button className="m-4 btn px-4 py-2 rounded bg-slate-600">
                        <Link to="/itinerary" className='font-semibold text-white'>View Itineraries</Link>
                    </button>
                    
                    <button className='btn px-4 py-2 ml-2 font-semibold text-white rounded bg-red-600' onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    );
};

export default Home;
