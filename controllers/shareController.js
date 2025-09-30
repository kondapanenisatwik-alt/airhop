const SharedRoute = require('../models/SharedRoute');

// Create a shareable link
const shareRoute = async (req, res) => {
  try {
    const { start, target, path, distance, aqi } = req.body;

    if (!start || !target || !path) {
      return res.status(400).json({ message: 'Missing route data' });
    }

    const shared = new SharedRoute({ start, target, path, distance, aqi });
    await shared.save();

    res.json({
      message: 'Shareable link created',
      link: `${process.env.BASE_URL || 'http://localhost:5000'}/api/share/${shared._id}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a shared route by ID
const getSharedRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await SharedRoute.findById(id);

    if (!route) return res.status(404).json({ message: 'Route not found' });

    res.json(route);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { shareRoute, getSharedRoute };
