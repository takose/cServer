const express = require('express');
const io = require('socket.io-client');
const FlameworkFramework = require('../lib/FlameworkFramework');

const app = express();
const FF = 'ff';
const dotenv = require('dotenv');

dotenv.config();
const socket = io.connect(process.env.HOST, {
  secure: true,
  query: {
    type: 'device',
    deviceId: FF,
  },
});
const ff = new FlameworkFramework(socket);
ff.init();

app.listen(3001);
