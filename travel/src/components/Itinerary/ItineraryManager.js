import React, { useState } from 'react';
import { useAuth } from '../Auth/useAuth';

const ItineraryManager = () => {
    const { user } = useAuth();
    const [itineraries, setItineraries] = useState([]);
    const [newItinerary, setNewItinerary] = useState('');

    const handleCreateItinerary = () => {
        setItineraries([...itineraries, { title: newItinerary, items: [] }]);
        setNewItinerary('');
    };

    return (
        <div>
            <h2>Manage Your Itineraries</h2>
            <input
                type="text"
                value={newItinerary}
                onChange={(e) => setNewItinerary(e.target.value)}
                placeholder="New itinerary title"
            />
            <button onClick={handleCreateItinerary}>Create Itinerary</button>
            <ul>
                {itineraries.map((itinerary, index) => (
                    <li key={index}>{itinerary.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItineraryManager;
