class Connection {
  constructor (socket, options = {}) {
    this.socket = socket
    this.init(options)
  }

  init(options) {
    this.socket.on('disconnect', () => {
      const { onDestroy } = options
      if (onDestroy != null) {
        onDestroy(this)
      }
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
