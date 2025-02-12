const moedels = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = require("../utils/generateToken");
const { Model } = require("sequelize");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await moedels.User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user.email);
    res.status(201).json({
      message: "Signed up successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await moedels.User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    const token = generateToken(email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });
    
    res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
