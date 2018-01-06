class Connection {
  constructor (socket, callback) {
    this.socket = socket
    this.init(callback)
  }

  init(callback) {
    this.socket.on('disconnect', () => {
      callback(this)
    });
  }

  getId() {
    throw new Error("not implemented")
  }

  getSocket() {
    return this.socket
  }
}

module.exports = Connection
