import React, { useState } from 'react';
import { generateBarcode } from '../services/api';

const BarcodeScanner = () => {
    const [drugData, setDrugData] = useState({
        name: '',
        batchNumber: '',
        expirationDate: '',
        quantity: '',
        location: '',
    });
    const [barcode, setBarcode] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await generateBarcode(drugData);
            setBarcode(response.barcode);
            setError(null);
        } catch (error) {
            console.error('Error generating barcode:', error);
            setError('Failed to generate barcode. Please try again.');
        }
    };

    return (
        <div>
            <h1>Barcode Generator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Drug Name"
                    value={drugData.name}
                    onChange={(e) => setDrugData({ ...drugData, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Batch Number"
                    value={drugData.batchNumber}
                    onChange={(e) => setDrugData({ ...drugData, batchNumber: e.target.value })}
                    required
                />
                <input
                    type="date"
                    placeholder="Expiration Date"
                    value={drugData.expirationDate}
                    onChange={(e) => setDrugData({ ...drugData, expirationDate: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={drugData.quantity}
                    onChange={(e) => setDrugData({ ...drugData, quantity: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={drugData.location}
                    onChange={(e) => setDrugData({ ...drugData, location: e.target.value })}
                    required
                />
                <button type="submit">Generate Barcode</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {barcode && <img src={barcode} alt="Generated Barcode" />}
        </div>
    );
};

export default BarcodeScanner;
