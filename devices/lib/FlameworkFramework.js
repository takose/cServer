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
  }
}

module.exports = FlameworkFramework;
