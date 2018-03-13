const net = require('net');

const Device = require('./Device');

class Smoon extends Device {
  constructor(socket) {
    super(socket);
    this.state = {
      amount: 0,
    };
  }

  init() {
    this.serialInit();
    this.socketInit();
  }

  socketInit() {
    this.socket.on('devices/state:fetch', () => {
      console.log('fetch data is not supported..');
    });
    this.socket.on('devices/state:update', (state) => {
      this.setAmount(state.amount);
      // this.socket.emit('devices/state:update/return');
      this.socket.emit('devices/command:done');
    });
  }

  serialInit() {
    this.client = new net.Socket();

    this.client.connect(process.env.SMOON_PORT, process.env.SMOON_HOST, () => {
      console.log(`CONNECTED TO: ${process.env.SMOON_HOST}: ${process.env.SMOON_PORT}`);
      this.client.write('\r\n');
    });

    this.client.on('data', (data) => {
      console.log(`Received > ${data}`);
    });

    this.client.on('close', () => {
      console.log('> connection is closed');
    });
  }

  setAmount(val) {
    console.log('enter', val)
    this.client.write((`volume ${val}\r\n`).toString());
  }
}

module.exports = Smoon;
