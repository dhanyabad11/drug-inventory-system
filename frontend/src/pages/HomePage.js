// src/pages/HomePage.js

import React from 'react';
import BarcodeScanner from '../components/BarcodeScanner';
import LocationDisplay from '../components/LocationDisplay';
import QRCodeReader from '../components/QRCodeReader';

const HomePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Drug Inventory Tracking System</h1>
      <div style={{ marginBottom: '20px' }}>
        <BarcodeScanner />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <LocationDisplay />
      </div>
      <div style={{ marginTop: '20px' }}>
        <QRCodeReader /> {/* QR Code Reader with button to display data */}
      </div>
    </div>
  );
};

export default HomePage;
