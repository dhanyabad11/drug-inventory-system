import React, { useState } from 'react';
import QRCodeScanner from 'react-qr-scanner';
import { getDrugLocation } from '../services/api';

const QRCodeReader = () => {
    const [scanResult, setScanResult] = useState('');
    const [error, setError] = useState('');

    const handleScan = async (data) => {
        if (data) {
            setScanResult(data.text);
            try {
                const drugData = await getDrugLocation(data.text);
                setScanResult(`Drug Location: ${drugData.location}`);
                setError('');
            } catch (error) {
                setError('Error retrieving drug information');
                setScanResult('');
            }
        }
    };

    const handleError = (error) => {
        console.error(error);
        setError('Error scanning QR code');
        setScanResult('');
    };

    return (
        <div>
            <h2>QR Code Reader</h2>
            <QRCodeScanner
                onScan={handleScan}
                onError={handleError}
                style={{ width: '100%' }}
            />
            {scanResult && <p>Result: {scanResult}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default QRCodeReader;
