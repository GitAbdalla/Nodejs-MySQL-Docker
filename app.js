const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");

const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/user");
const commentRoutes = require("./routes/comments");

app.use(express.json());
app.use(cookieParser());

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);
app.use("/comments", commentRoutes);
module.exports = app;
