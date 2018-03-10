const SerialPort = require('serialport');

const Device = require('./Device');

class FlameworkFramework extends Device {
  constructor(socket) {
    super(socket);
    this.state = {
      power: 0,
      time: 0,
    };
  }

  init() {
    this.serialInit();

    this.socket.on('devices/state:fetch', () => {
      this.socket.emit('devices/state:fetch/return', this.state);
    });
    this.socket.on('devices/state:update', (state) => {
      Object.entries(state).forEach(([k, v]) => {
        switch (k) {
          case 'power': {
            this.setPower(v);
            break;
          }
          case 'time': {
            if (this.state.time !== 0) {
              this.state.time = 0;
            }
            this.measureTime(v);
            break;
          }
          default:
            break;
        }
      });
      this.socket.emit('devices/state:update/return');
    });
  }

  serialInit() {
    this.port = new SerialPort(process.env.SERIAL_PORT, {
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

  setPower(val) {
    this.state.power = val;
    let power;
    // magic number..
    if (val === 0) {
      power = 10;
    } else if (val === 1) {
      power = 100;
    } else if (val === 2) {
      power = 120;
    } else if (val === 3) {
      power = 160;
    } else if (val === 4) {
      power = 190;
    } else if (val === 5) {
      power = 230;
    } else if (val === 6) {
      power = 256;
    }
    this.port.write(`s${power}\n`, (err) => {
      if (err) {
        console.log('Error on write: ', err.message);
      } else {
        console.log('send successed');
      }
    });
  }

  measureTime(val) {
    this.state.time = val;

    const count = setInterval(() => {
      this.state.time = this.state.time - 1;
      console.log(`time: ${this.state.time}`);
      if (this.state.time <= 0) {
        clearInterval(count);
        this.socket.emit('devices/command:done');
        this.socket.once('devices/command:done/return', () => {
          console.log('notified Done');
        });
      }
    }, 1000);
  }
}

module.exports = FlameworkFramework;
