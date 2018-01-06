const Connection = require('./Connection')

class DeviceConnection extends Connection {
  constructor (socket) {
    super(socket)
  }
}

module.exports = DeviceConnection
