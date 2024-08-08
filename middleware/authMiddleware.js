require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model is defined


const authMiddleware = async (req, res, next) => {
  // Extract token from request header
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    // Verify token validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    // Attach user and token data to request for use in route handlers
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports ={ authMiddleware};
