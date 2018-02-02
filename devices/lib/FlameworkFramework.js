const Device = require('./Device');

class FlameworkFramework extends Device {
  constructor(socket) {
    super(socket);
    this.state = {
      power: 0,
    };
    this.init();
  }
  init() {
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
}

module.exports = FlameworkFramework;
