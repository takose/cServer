const Connection = require('./connection')

class User extends Connection {
  constructor (socket) {
    super(socket)
  }
}

module.exports = User