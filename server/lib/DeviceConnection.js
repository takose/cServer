const Connection = require('./Connection');

class DeviceConnection extends Connection {
  getId() {
    return this.getSocket().handshake.query.deviceId;
  }
  fetchState() {
    this.socket.emit('devices/state:fetch');
    return new Promise((resolve) => {
      this.socket.on('devices/state:fetch/return', (state) => {
        resolve(state);
      });
    });
  }

  updateState(states) {
    this.socket.emit('devices/state:update', states);
    return new Promise((resolve) => {
      this.socket.on('devices/state:update/return', () => {
        resolve();
      });
    });
  }
}

module.exports = DeviceConnection;
