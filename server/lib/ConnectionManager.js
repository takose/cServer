const DeviceConnection = require('./DeviceConnection');
const UserConnection = require('./UserConnection');

const USER = 'user';
const DEVICE = 'device';

class ConnectionManager {
  constructor() {
    this.deviceConnections = new Map();
    this.userConnections = new Map();
  }

  addConnection(socket) {
    const { query } = socket.handshake;
    switch (query.type) {
      case USER: {
        const userConn = new UserConnection(socket, {
          onDestroy: c => this.removeConnection(c),
          onFetchStates: id => this.onFetchStates(id),
          onUpdateStates: data => this.onUpdateStates(data),
        });
        this.userConnections.set(userConn.getId(), userConn);
        break;
      }
      case DEVICE: {
        const deviceConn = new DeviceConnection(socket, {
          onDestroy: c => this.removeConnection(c),
          notifyDone: id => this.notifyDone(id),
        });
        this.deviceConnections.set(deviceConn.getId(), deviceConn);
        break;
      }
      default:
        throw new Error(`Unexpected query ${JSON.stringify(query)}`);
    }
  }

  onFetchStates(deviceId) {
    const deviceConnection = this.deviceConnections.get(deviceId);
    return deviceConnection.fetchState();
  }

  onUpdateStates({ deviceId, states }) {
    const deviceConnection = this.deviceConnections.get(deviceId);
    // eslint-disable-next-line eqeqeq
    if (deviceConnection == undefined) {
      return Promise.resolve('device not found');
    }
    return deviceConnection.updateState(states);
  }

  notifyDone(deviceId) {
    const userConnRes = [];
    this.userConnections.forEach((userConnection) => {
      userConnRes.push(userConnection.notifyDone(deviceId));
    });
    return Promise.all(userConnRes);
  }

  removeConnection(conn) {
    if (conn instanceof UserConnection) {
      this.userConnections.delete(conn.getId());
    } else if (conn instanceof DeviceConnection) {
      this.deviceConnections.delete(conn.getId());
    }
  }
}

module.exports = ConnectionManager;
