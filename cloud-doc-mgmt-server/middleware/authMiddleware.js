const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Authentication Middleware
function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'No token Provided' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized  User' });
      }
      req.userEmail = decoded.userEmail;
      next();
    });
  }
  
module.exports = authMiddleware;