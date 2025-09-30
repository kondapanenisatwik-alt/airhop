const Search = require('../models/Search');

const previousSearches = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const searches = await Search.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(searches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { previousSearches };
