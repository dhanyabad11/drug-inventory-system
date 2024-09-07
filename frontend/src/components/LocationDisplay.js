import React, { useState } from 'react';
import { getDrugLocation } from '../services/api';

const LocationDisplay = () => {
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const fetchLocation = async (batchNumber) => {
        try {
            const data = await getDrugLocation(batchNumber);
            setLocation(data.location);
            setError('');
        } catch (error) {
            setError('Drug not found');
            setLocation('');
        }
    };

    return (
        <div>
            <h2>Find Drug Location</h2>
            <input
                type="text"
                placeholder="Enter Batch Number"
                onChange={(e) => fetchLocation(e.target.value)}
            />
            {error && <p>{error}</p>}
            {location && <p>Location: {location}</p>}
        </div>
    );
};

export default LocationDisplay;
