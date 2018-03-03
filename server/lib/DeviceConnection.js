const Connection = require('./Connection');
const deviceEvents = require('../../common/events/devices');

class DeviceConnection extends Connection {
  constructor(socket, options = {}) {
    super(socket, options);
    // this.init(options);
  }

  getId() {
    return this.getSocket().handshake.query.deviceId;
  }

  init(options) {
    super.init(options);
    this.socket.on('devices/command:done', () => {
      const { notifyDone } = options;
      if (notifyDone !== null) {
        const result = notifyDone(this.getId());
        if (result !== undefined) {
          // TODO result に Promise がはいらない
          result.then(() => {
            this.socket.emit('devices/command:done/return');
          });
        }
      }
    });
  }

  fetchState() {
    this.socket.emit(deviceEvents.fetchState);
    return new Promise((resolve) => {
      this.socket.on(deviceEvents.fetchStateReturn, resolve);
    });
  }

  updateState(states) {
    this.socket.emit(deviceEvents.updateState, states);
    return new Promise((resolve) => {
      this.socket.once(deviceEvents.updateStateReturn, () => {
        resolve();
      });
    });
  }
}

module.exports = DeviceConnection;
