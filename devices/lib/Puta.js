const SerialPort = require('serialport');

const Device = require('./Device');

class Puta extends Device {
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
      this.socket.emit('devices/state:fetch/return', this.state);
    });
    this.socket.on('devices/state:update', (state) => {
      this.setAmount(state.amount);
      // this.socket.emit('devices/state:update/return');
      this.socket.emit('devices/command:done');
    });
  }

  serialInit() {
    this.port = new SerialPort(process.env.SERIAL_PORT_PUTA, {
      baudRate: 57600,
    });

    this.port.write('R\n', (err) => {
      if (err) {
        console.log('Error on write: ', err.message);
      } else {
        console.log('serial init');
      }
    });

    this.port.on('error', (err) => {
      console.log('Error: ', err.message);
    });

    this.port.on('data', (data) => {
      console.log('Data:', data);
    });
  }

  setAmount(val) {
    this.port.write(`s${val}\n`, (err) => {
      if (err) {
        console.log('Error on write: ', err.message);
      } else {
        console.log('send successed');
      }
    });
  }
}

module.exports = Puta;
