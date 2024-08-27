import React, { useState } from 'react';

const ItineraryForm = ({ onSave }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [destinations, setDestinations] = useState([]);

    const addDestination = () => {
        setDestinations([...destinations, { name: '', activities: [] }]);
    };

    const handleSave = () => {
        const itinerary = { title, startDate, endDate, destinations };
        onSave(itinerary);
        setTitle('');
        setStartDate('');
        setEndDate('');
        setDestinations([]);
    };

    return (
        <div>
            <h2>Create Itinerary</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={addDestination}>Add Destination</button>
            <button onClick={handleSave}>Save Itinerary</button>
        </div>
    );
};

export default ItineraryForm;
