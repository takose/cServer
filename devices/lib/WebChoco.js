const SerialPort = require('serialport');
const Device = require('./Device');

class WebChoco extends Device {
  constructor(socket) {
    super(socket);
    this.state = {
      sugar: 0,
      butter: 0,
      mass: 0,
    };
  }

  init() {
    this.serialInit();
    this.socketInit();
  }

  socketInit() {
    this.socket.on('devices/state:update', (state) => {
      this.makeChoco(state);
      // this.socket.emit('devices/state:update/return');
      this.socket.emit('devices/command:done');
    });
  }

  serialInit() {
    this.port = new SerialPort(process.env.SERIAL_PORT_CHOCO, {
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

  makeChoco(ingredients) {
    let sugar = parseInt(ingredients.sugar, 10);
    let butter = parseInt(ingredients.butter, 10);
    let mass = parseInt(ingredients.mass, 10);
    const count = setInterval(() => {
      if (sugar > 0) {
        this.port.write('A', (err) => {
          if (err) {
            console.log('Error on write: ', err.message);
          } else {
            console.log('move successed');
          }
        });
        sugar -= 1;
      }
      if (butter > 0) {
        this.port.write('B', (err) => {
          if (err) {
            console.log('Error on write: ', err.message);
          } else {
            console.log('move successed');
          }
        });
        butter -= 1;
      }
      if (mass > 0) {
        this.port.write('C', (err) => {
          if (err) {
            console.log('Error on write: ', err.message);
          } else {
            console.log('move successed');
          }
        });
        mass -= 1;
      }
      if (sugar <= 0 && butter <= 0 && mass <= 0) {
        clearInterval(count);
      }
      console.log(sugar, butter, mass);
    }, 500);
  }
}

module.exports = WebChoco;
