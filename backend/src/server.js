const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true
  })
  .then(() => console.info('CONNECTED TO DATABASE'))
  .catch(err => console.error('error in connecting to database', err));

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use('/devs', routes);

server.listen(3333, () => console.log('server listening on 3333...'));
