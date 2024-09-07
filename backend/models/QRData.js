// models/QRData.js
const mongoose = require('mongoose');

const QRDataSchema = new mongoose.Schema({
    qrCode: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true,
});

const QRData = mongoose.model('QRData', QRDataSchema);

module.exports = QRData;
