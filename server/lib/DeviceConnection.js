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
}

module.exports = DeviceConnection;
