const Device = require('./Device');

class FlameworkFramework extends Device {
  constructor(socket) {
    super(socket);
    this.state = {
      power: 0,
    };
  }
}

module.exports = FlameworkFramework;
