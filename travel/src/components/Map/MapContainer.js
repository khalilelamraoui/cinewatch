import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = ({ destinations, google }) => {
    return (
        <Map
            google={google}
            zoom={5}
            initialCenter={{ lat: 37.7749, lng: -122.4194 }} // Set to initial location
        >
            {destinations.map((destination, index) => (
                <Marker key={index} position={{ lat: destination.lat, lng: destination.lng }} />
            ))}
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
})(MapContainer);
