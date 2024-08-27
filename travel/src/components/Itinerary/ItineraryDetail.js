import React from 'react';

const ItineraryDetail = ({ itinerary }) => {
    if (!itinerary) return <div>Select an itinerary to view details</div>;

    return (
        <div>
            <h2>{itinerary.title}</h2>
            <p>
                {itinerary.startDate} - {itinerary.endDate}
            </p>
            <h3>Destinations</h3>
            <ul>
                {itinerary.destinations.map((destination, index) => (
                    <li key={index}>{destination.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItineraryDetail;
