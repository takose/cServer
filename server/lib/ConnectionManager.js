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
        });
        this.userConnections.set(userConn.getId(), userConn);
        break;
      }
      case DEVICE: {
        const deviceConn = new DeviceConnection(socket, {
          onDestroy: c => this.removeConnection(c),
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
  removeConnection(conn) {
    if (conn instanceof UserConnection) {
      this.userConnections.delete(conn.getId());
    } else if (conn instanceof DeviceConnection) {
      this.deviceConnections.delete(conn.getId());
    }
  }
}

module.exports = ConnectionManager;
