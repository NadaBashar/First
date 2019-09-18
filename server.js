const http = require('http');
const dot = require('dotenv').config();
const app = require('./app');

const hostname = process.env.HOST;
const port = process.env.PORT;

const server =http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);});
