const express = require('express');
const io = require('socket.io-client');
const FlameworkFramework = require('./lib/FlameworkFramework');

const app = express();
const FF = 'ff';

const socket = io('http://localhost:3000', {
  query: {
    type: 'device',
    deviceId: FF,
  },
});
const ff = new FlameworkFramework(socket);
ff.init();

app.listen(3001);
