const express = require('express');
const io = require('socket.io-client');
const Puta = require('../lib/Puta');

const app = express();
const id = 'puta';
const dotenv = require('dotenv');

dotenv.config();
const socket = io(process.env.HOST, {
  query: {
    type: 'device',
    deviceId: id,
  },
});
const puta = new Puta(socket);
puta.init();

app.listen(3004);
