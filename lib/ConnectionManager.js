const DeviceConnection = require('./DeviceConnection')
const UserConnection = require('./UserConnection')

const USER = 'user'
const DEVICE = 'device'

class ConnectionManager {
  constructor () {
    this.deviceConnections = new Map()
    this.userConnections = new Map()
  }

  addConnection (socket) {
    const { query } = socket.handshake
    switch (query.type) {
      case USER:
        const conn = new UserConnection(socket, removeConnection)
        this.userConnections.set(conn.getId(), conn)
        break;
      case DEVICE:
        const conn = new DeviceConnection(socket, removeConnection)
        this.deviceConnections.set(conn.getId(), conn)
        break;
      default:
        throw new Error('Unexpected query');
    }
    console.log(this.userConnections)
  }

  removeConnection(conn) {
    if (conn instanceof UserConnection) {
      this.userConnections.delete(conn.getId())
    } else if (conn instanceof DeviceConnection) {
      this.deviceConnections.delete(conn.getId())
    }
    console.log(this.userConnections)
  }
}

module.exports = ConnectionManager
