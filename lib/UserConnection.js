const Connection = require('./Connection')

class UserConnection extends Connection {
  constructor (socket) {
    super(socket)
  }
}

module.exports = UserConnection
