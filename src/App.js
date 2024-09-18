import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Browse from './pages/Browse';
import Watchlist from './pages/Watchlist';
import Homepage from './pages/Homepage';
import MovieDetails from './pages/MovieDetails';
import { isAuthenticated } from './services/auth';
import './App.css';

/**
 * PrivateRoute component is used to protect routes that require authentication.
 * If the user is authenticated, it renders the children components; otherwise, it redirects to the login page.
 */
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

/**
 * App component is the main component that sets up routing for the application.
 * It includes the Header and Footer components and defines routes for different pages.
 */
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-work-sans">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/watchlist" element={<PrivateRoute><Watchlist /></PrivateRoute>} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;