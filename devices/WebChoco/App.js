const express = require('express');
const io = require('socket.io-client');
const WebChoco = require('../lib/WebChoco');

const app = express();
const id = 'webChoco';
const dotenv = require('dotenv');

dotenv.config();
// const socket = io(process.env.HOST, {
const socket = io('http://localhost:3000', {
  query: {
    type: 'device',
    deviceId: id,
  },
});
const webChoco = new WebChoco(socket);
webChoco.init();

app.listen(3004);
