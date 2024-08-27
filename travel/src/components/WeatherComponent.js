import React, { useState, useEffect } from 'react';
import { getWeather } from '../services/weatherService';

const WeatherComponent = ({ destination }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const data = await getWeather(destination.lat, destination.lng);
            setWeather(data);
        };

        fetchWeather();
    }, [destination]);

    if (!weather) return <div>Loading weather...</div>;

    return (
        <div>
            <h3>Weather for {destination.name}</h3>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
        </div>
    );
};

export default WeatherComponent;
