import React from 'react';

const ShareItinerary = () => {
    const handleShare = () => {
        // Implement sharing functionality here
        alert('Share functionality will be implemented here.');
    };

    return (
        <div>
            <h2>Share Your Itinerary</h2>
            <button onClick={handleShare}>Share via Link</button>
            <button onClick={handleShare}>Share via Email</button>
        </div>
    );
};

export default ShareItinerary;
