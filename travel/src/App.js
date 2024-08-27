import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthProvider'; // Adjust path if needed
import Home from './components/Home'; // Adjust path if needed
import Login from './components/Auth/Login'; // Adjust path if needed
import Register from './components/Auth/Register'; // Adjust path if needed
import ItineraryManager from './components/Itinerary/ItineraryManager'; // Adjust path if needed
import PrivateRoute from './components/Auth/PrivateRoute'; // Adjust path if needed

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/itinerary" 
              element={
                <PrivateRoute>
                  <ItineraryManager />
                </PrivateRoute>
              } 
            />
            {/* Add other routes as needed */}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
