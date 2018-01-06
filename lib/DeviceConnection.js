const Connection = require('./Connection')

class DeviceConnection extends Connection {
  getId() {
    return this.getSocket().handshake.query.deviceId
  }
}

module.exports = DeviceConnection
