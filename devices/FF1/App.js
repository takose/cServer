const express = require('express');
const io = require('socket.io-client');
const FlameworkFramework1 = require('../lib/FlameworkFramework1');

const app = express();
const FF1 = 'ff1';
const dotenv = require('dotenv');

dotenv.config();
const socket = io.connect(process.env.HOST, {
  secure: true,
  query: {
    type: 'device',
    deviceId: FF1,
  },
});
const ff = new FlameworkFramework1(socket);
ff.init();

app.listen(3001);
