const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../auth/authRouter');
const exercisesRouter = require('../exercises/exercisesRouter');

// create server
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// first endpoint
server.get('/', (req, res) => {
  res.status(200).json({ server: 'server is up'});
});

server.use('/auth', authRouter);
server.use('/exercises', exercisesRouter);

module.exports = server;