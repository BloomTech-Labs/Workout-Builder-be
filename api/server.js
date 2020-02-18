const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../auth/authRouter');
const exercisesRouter = require('../exercises/exercisesRouter');
const workoutsRouter = require('../workouts/workoutsRouter');
const clientsRouter = require('../clients/clientsRouter');
const programsRouter = require('../programs/programsRouter');
const clientProgramRouter = require('../clients/clientProgramRouter');

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
server.use('/workouts', workoutsRouter);
server.use('/clients', clientsRouter);
server.use('/programs', programsRouter);
server.use('/clients-programs', clientProgramRouter);

module.exports = server;