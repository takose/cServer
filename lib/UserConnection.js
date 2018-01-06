const Connection = require('./Connection')

class UserConnection extends Connection {
  getId() {
    return this.getSocket().id
  }
}

module.exports = UserConnection
