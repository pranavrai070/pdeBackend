require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET


const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

module.exports ={generateToken};