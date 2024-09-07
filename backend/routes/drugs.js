const express = require('express');
const QRCode = require('qrcode');
const Drug = require('../models/Drug');

const router = express.Router();

// Generate barcode for a drug
router.post('/generate-barcode', async (req, res) => {
    const { name, batchNumber, expirationDate, quantity, location } = req.body;

    try {
        const barcodeData = `${batchNumber}-${name}-${expirationDate}-${quantity}-${location}`;
        const barcode = await QRCode.toDataURL(barcodeData);

        const newDrug = new Drug({
            name,
            batchNumber,
            expirationDate,
            quantity,
            location,
            barcode,
        });

        await newDrug.save();
        res.json(newDrug);
    } catch (err) {
        console.error('Error generating barcode:', err);
        res.status(500).send('Error generating barcode');
    }
});

// Get all drugs
router.get('/', async (req, res) => {
    try {
        const drugs = await Drug.find();
        res.json(drugs);
    } catch (err) {
        console.error('Error retrieving drugs:', err);
        res.status(500).send('Error retrieving drugs');
    }
});

// Get drug by QR data
router.get('/qr/:data', async (req, res) => {
    const { data } = req.params;

    try {
        const [batchNumber] = data.split('-');
        const drug = await Drug.findOne({ batchNumber });

        if (drug) {
            res.json(drug);
        } else {
            res.status(404).json({ error: 'Drug not found' });
        }
    } catch (err) {
        console.error('Error retrieving drug information:', err);
        res.status(500).json({ error: 'Error retrieving drug information' });
    }
});

module.exports = router;
