import React, { useState } from 'react';
import axios from 'axios';

const UpdateLocation = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [location, setLocation] = useState('');

  const updateLocation = async () => {
    try {
      await axios.put(`/drugs/update-location/${batchNumber}`, { location });
      alert('Location updated successfully');
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  return (
    <div>
      <h2>Update Drug Location</h2>
      <input
        type="text"
        placeholder="Enter Batch Number"
        value={batchNumber}
        onChange={(e) => setBatchNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter New Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={updateLocation}>Update Location</button>
    </div>
  );
};

export default UpdateLocation;
