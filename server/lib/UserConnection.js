const Connection = require('./Connection');

class UserConnection extends Connection {
  constructor(socket, options = {}) {
    super(socket, options);
    this.init(options);
  }
  getId() {
    return this.getSocket().id;
  }
  init(options) {
    this.socket.on('users/state:fetch', (deviceId) => {
      const { onFetchStates } = options;
      if (onFetchStates != null) {
        onFetchStates(deviceId).then((state) => {
          this.socket.emit('users/state:fetch/return', state);
        });
      }
    });
  }
}

module.exports = UserConnection;
