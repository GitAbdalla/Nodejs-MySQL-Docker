const jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config();

exports.checkAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in, please login to access this route",
      });
    }
    console.log("Received token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SERCRET);

    if (!decoded || !decoded.email) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const currentUser = await models.User.findOne({
      where: { email: decoded.email },
    });
    if (!currentUser) {
      return res.status(401).json({
        message: "The user belonging to this token no longer exists",
      });
    }

    req.user = currentUser;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
