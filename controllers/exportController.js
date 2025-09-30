const PDFDocument = require('pdfkit');
const path = require('path');

const exportRoute = async (req, res) => {
  try {
    const { start, target, path: routePath, distance, aqi } = req.body;

    if (!start || !target || !routePath) {
      return res.status(400).json({ message: 'Missing route data' });
    }

    const doc = new PDFDocument();
    const filename = `route_${Date.now()}.pdf`;

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text('AirHop Route Export', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Start: ${start}`);
    doc.text(`Target: ${target}`);
    doc.text(`Path: ${routePath.join(' → ')}`);
    doc.text(`Distance: ${distance}`);
    doc.text(`AQI: ${aqi}`);
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { exportRoute };
