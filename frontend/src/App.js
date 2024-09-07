import React, { useState, useEffect } from 'react';
import { generateBarcode, getAllDrugs } from './services/api';
import QRCodeReader from './components/QRCodeReader';
import BarcodeScanner from './components/BarcodeScanner';
import LocationDisplay from './components/LocationDisplay';

function App() {
    const [drugName, setDrugName] = useState('');
    const [batchNumber, setBatchNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setLocation] = useState('');
    const [barcode, setBarcode] = useState('');
    const [drugs, setDrugs] = useState([]);

    useEffect(() => {
        fetchDrugs();
    }, []);

    const handleGenerateBarcode = async () => {
        const drugData = {
            name: drugName,
            batchNumber,
            expirationDate,
            quantity,
            location,
        };

        try {
            const newDrug = await generateBarcode(drugData);
            setBarcode(newDrug.barcode);
            alert('Barcode generated and saved successfully!');
            fetchDrugs();
        } catch (error) {
            alert('Failed to generate barcode.');
        }
    };

    const fetchDrugs = async () => {
        try {
            const drugsData = await getAllDrugs();
            setDrugs(drugsData);
        } catch (error) {
            console.error('Error fetching drugs:', error);
        }
    };

    return (
        <div className="container">
            <h1>Drug Inventory Tracking System</h1>

            <div className="form-container">
                <h2>Generate a Barcode</h2>
                <input type="text" placeholder="Drug Name" value={drugName} onChange={(e) => setDrugName(e.target.value)} />
                <input type="text" placeholder="Batch Number" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} />
                <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                <button onClick={handleGenerateBarcode}>Generate Barcode</button>
            </div>

            <div className="barcode-result">
                {barcode && <img src={barcode} alt="Generated Barcode" />}
            </div>

            <div className="drug-list">
                <h2>Drug Location</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Drug Name</th>
                            <th>Batch Number</th>
                            <th>Expiration Date</th>
                            <th>Quantity</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drugs.map((drug, index) => (
                            <tr key={index}>
                                <td>{drug.name}</td>
                                <td>{drug.batchNumber}</td>
                                <td>{drug.expirationDate}</td>
                                <td>{drug.quantity}</td>
                                <td>{drug.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <QRCodeReader />
            <BarcodeScanner />
            <LocationDisplay />
        </div>
    );
}

export default App;
