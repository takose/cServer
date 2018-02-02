const Connection = require('./Connection');
const deviceEvents = require('../../common/events/devices');

class DeviceConnection extends Connection {
  getId() {
    return this.getSocket().handshake.query.deviceId;
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
      this.socket.on(deviceEvents.updateStateReturn, () => {
        resolve();
      });
    });
  }
}

module.exports = DeviceConnection;
