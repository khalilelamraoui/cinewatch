import React from 'react';

const ItineraryList = ({ itineraries, onSelect }) => {
    return (
        <div>
            <h2>My Itineraries</h2>
            <ul>
                {itineraries.map((itinerary, index) => (
                    <li key={index} onClick={() => onSelect(itinerary)}>
                        {itinerary.title} ({itinerary.startDate} - {itinerary.endDate})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItineraryList;
