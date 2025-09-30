const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(); // allow routes that don't require login
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded user info
  } catch (err) {
    console.error("❌ Invalid token");
  }

  next();
}

module.exports = auth;
