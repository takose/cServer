const Device = require('./Device');

class FlameworkFramework extends Device {
  constructor(socket) {
    super(socket);
    this.state = {
      power: 0,
      time: 0,
    };
    this.init();
  }
  init() {
    this.socket.on('devices/state:fetch', () => {
      this.socket.emit('devices/state:fetch/return', this.state);
    });
    this.socket.on('devices/state:update', (state) => {
      if (state.time === this.state.time && state.power === this.state.power) {
        return;
      }
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

  setPower(val) {
    this.state.power = val;
  }

  measureTime(val) {
    this.state.time = val;
    const count = setInterval(() => {
      this.state.time = this.state.time - 1;
      console.log(`time: ${this.state.time}`);
      if (this.state.time <= 0) {
        clearInterval(count);
        this.socket.emit('devices/command:done');
        // this.socket.on('devices/command:done/return', () => {
        //   console.log('notified Done');
        // });
      }
    }, 1000);
  }
}

module.exports = FlameworkFramework;
