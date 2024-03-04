const jwt = require("jsonwebtoken");

const checkTokenValidity = (req, res, next) => {
    // Get the token from the request header
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }
  
    // Split the header to get the token part
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }
  
    const token = tokenParts[1];
  
    // Verify the token
    jwt.verify(token, process.env.JWT_TOKEN_ID, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      // Attach the decoded payload to the request for further use
      req.user = decoded;
      next();
    });
};

module.exports = checkTokenValidity;