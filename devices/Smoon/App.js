const express = require('express');
const io = require('socket.io-client');
const Smoon = require('../lib/Smoon');

const app = express();
const id = 'smoon';
const dotenv = require('dotenv');

dotenv.config();
const socket = io(process.env.HOST, {
  query: {
    type: 'device',
    deviceId: id,
  },
});
const smoon = new Smoon(socket);
smoon.init();

app.listen(3002);
