const express = require('express');
const dotenv = require("dotenv");
const app = express();

const postsRoutes = require('./routes/posts')
const usersRoutes = require('./routes/user')

app.use(express.json())

app.use('/posts', postsRoutes)
app.use('/users', usersRoutes )
module.exports = app;