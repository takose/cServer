const express = require('express');
const io = require('socket.io-client');
const FlameworkFramework2 = require('../lib/FlameworkFramework2');

const app = express();
const FF2 = 'ff2';
const dotenv = require('dotenv');

dotenv.config();
const socket = io.connect(process.env.HOST, {
  secure: true,
  query: {
    type: 'device',
    deviceId: FF2,
  },
});
const ff = new FlameworkFramework2(socket);
ff.init();

app.listen(3006);
