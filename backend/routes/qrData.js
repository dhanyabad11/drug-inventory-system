const QRCode = require('qrcode');

router.post('/generate', async (req, res) => {
  const { batchNumber, name } = req.body;
  const data = { batchNumber, name };
  try {
    const qrCode = await QRCode.toDataURL(JSON.stringify(data));  // QR Code with drug data
    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR code' });
  }
});
