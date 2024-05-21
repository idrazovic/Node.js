const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('middleware');
    res.send('<h1>Express</h1>')
});

const server = http.createServer(app);

server.listen(8000);