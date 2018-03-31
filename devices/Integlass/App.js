const express = require('express');
const io = require('socket.io-client');
const Integlass = require('../lib/Integlass');

const app = express();
const id = 'integlass';
const dotenv = require('dotenv');

dotenv.config();
const socket = io(process.env.HOST, {
  query: {
    type: 'device',
    deviceId: id,
  },
});
const integlass = new Integlass(socket);
integlass.init();

app.listen(3003);
