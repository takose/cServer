const Connection = require('./connection')

class Device extends Connection {
  constructor (socket) {
    super(socket)
  }
}

module.exports = Device