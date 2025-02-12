const jwt = require("jsonwebtoken");
require('dotenv').config();


const generateToken = (payload)=>{
    return jwt.sign({email: payload}, process.env.JWT_SERCRET,{
        expiresIn: process.env.JWT_EXP
    })
}

module.exports = generateToken