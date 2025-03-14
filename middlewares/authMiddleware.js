const jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config();

exports.checkAuth = async (req, res, next) => {
  try {
    let token;

    // if (
    //   req.headers.authorization &&
    //   req.headers.authorization.startsWith("Bearer")
    // ) {
    //   token = req.headers.authorization.split(" ")[1];
    // }
    if(req.cookies && req.cookies.token){
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in, please login to access this route",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
    console.error("Error during token validation:", error.message);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
