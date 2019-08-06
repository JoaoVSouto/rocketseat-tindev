const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const server = express();

mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true
  })
  .then(() => console.info('CONNECTED TO DATABASE'))
  .catch(err => console.error('error in connecting to database', err));

server.use(cors());
server.use(express.json());
server.use('/devs', routes);

server.listen(3333, () => console.log('server listening on 3333...'));
