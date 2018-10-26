const Connection = require('./Connection');

class UserConnection extends Connection {
  constructor(socket, options = {}) {
    super(socket, options);
  }

  getId() {
    return this.getSocket().id;
  }

  init(options) {
    super.init(options);
    this.socket.on('users/state:fetch', (deviceId) => {
      const { onFetchStates } = options;
      onFetchStates(deviceId).then((state) => {
        this.socket.emit('users/state:fetch/return', state);
      });
    });

    this.socket.on('users/state:update', (data) => {
      const { onUpdateStates } = options;
      console.log(`received ${JSON.stringify(data)}`);
      onUpdateStates(data).then((error) => {
        // eslint-disable-next-line eqeqeq
        if (error != undefined) {
          console.log(error);
          this.socket.emit(`users/${data.deviceId}/done/failed`);
        } else {
          if (data.deviceId !== 'ff1' && data.deviceId !== 'ff2') {
            this.socket.emit(`users/${data.deviceId}/done`);
          }
          this.socket.emit('users/state:update/return');
        }
      });
    });
  }

  notifyDone(deviceId) {
    this.socket.emit(`users/${deviceId}/done`);
    return new Promise((resolve) => {
      this.socket.once(`users/${deviceId}/done/return`, resolve);
    });
  }
}

module.exports = UserConnection;
