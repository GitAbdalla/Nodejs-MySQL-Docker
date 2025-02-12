const jwt = require("jsonwebtoken");
require('dotenv').config();


const generateToken = (email) => {
    return jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });
  };
  


module.exports = generateToken;