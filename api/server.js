const express = require("express");

const accountsRouter = require('../routes/accountsRouter')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: "up" })
})

//Accounts Router
server.use('/api/accounts', accountsRouter)

module.exports = server;
