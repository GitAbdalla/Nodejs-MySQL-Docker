const http = require('http')
const app = require('./app');
const dotenv = require("dotenv");

const server = http.createServer(app)

server.listen(8080, ()=>{
    console.log('server is running')
})
