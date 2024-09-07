const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
    name: String,
    batchNumber: String,
    expirationDate: Date,
    quantity: Number,
    location: String,
    barcode: String
});

module.exports = mongoose.model('Drug', drugSchema);
