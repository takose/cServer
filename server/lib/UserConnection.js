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
    super.init(options);
    this.socket.on('users/state:fetch', (deviceId) => {
      const { onFetchStates } = options;
      if (onFetchStates != null) {
        onFetchStates(deviceId).then((state) => {
          this.socket.emit('users/state:fetch/return', state);
        });
      }
    });

    this.socket.on('users/state:update', (data) => {
      const { onUpdateStates } = options;
      if (onUpdateStates != null) {
        onUpdateStates(data).then(() => {
          this.socket.emit('users/state:update/return');
        });
      }
    });
  }
}

module.exports = UserConnection;
