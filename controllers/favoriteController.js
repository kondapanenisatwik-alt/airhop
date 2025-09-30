const Favorite = require('../models/Favorite');

// Add a favorite
const addFavorite = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const { start, target, path, distance, aqi } = req.body;

    const favorite = new Favorite({
      user: req.user.userId,
      start,
      target,
      path,
      distance,
      aqi
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all favorites
const getFavorites = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const favorites = await Favorite.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a favorite
const deleteFavorite = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params;
    const favorite = await Favorite.findOneAndDelete({ _id: id, user: req.user.userId });

    if (!favorite) return res.status(404).json({ message: 'Favorite not found' });

    res.json({ message: 'Favorite deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addFavorite, getFavorites, deleteFavorite };
