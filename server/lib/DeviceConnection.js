const Connection = require('./Connection');
const deviceEvents = require('../../common/events/devices');

class DeviceConnection extends Connection {
  constructor(socket, options = {}) {
    super(socket, options);
  }

  getId() {
    return this.getSocket().handshake.query.deviceId;
  }

  init(options) {
    super.init(options);
    this.socket.on('devices/command:done', () => {
      const { notifyDone } = options;
      const result = notifyDone(this.getId());
      result.then(() => {
        this.socket.emit('devices/command:done/return');
      });
    });
  }

  fetchState() {
    this.socket.emit(deviceEvents.fetchState);
    return new Promise((resolve) => {
      this.socket.on(deviceEvents.fetchStateReturn, resolve);
    });
  }

  updateState(states) {
    console.log(`send ${JSON.stringify(states)} to ${this.getId()}`);
    this.socket.emit(deviceEvents.updateState, states);
    return new Promise((resolve) => {
      this.socket.once(deviceEvents.updateStateReturn, () => {
        resolve();
      });
    });
  }
}

module.exports = DeviceConnection;
