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
    switch (query.token) {
      case USER:
        this.userConnections.set(socket.id, new UserConnection(socket))
        break;
      case DEVICE:
        this.deviceConnections.set(query.deviceId, new DeviceConnection(socket))
        break;
      default:
        throw new Error('Unexpected query');
    }
    console.log(this.userConnections)
  }

  removeConnection (socket) {
    const query = socket.handshake.query
    switch (query.token) {
      case USER:
        this.userConnections.delete(socket.id)
        break;
      case DEVICE:
        this.deviceConnections.delete(query.deviceId)
        break;
      default:
        throw new Error('Unexpected query');
    }
    console.log(this.userConnections)
  }
}

module.exports = ConnectionManager
