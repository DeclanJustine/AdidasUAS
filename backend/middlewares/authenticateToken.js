const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (req.session && req.session.user) {
    req.user = req.session.user;
    return next();
  }

  if (!token) {
    return res.status(401).json({ error: "Access Denied. Token or session needed." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
