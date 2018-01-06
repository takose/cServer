const Device = require('./device')
const User = require('./user')

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
        this.userConnections.set(socket.id, new User(socket))
        break;
      case DEVICE:
        this.deviceConnections.set(query.deviceId, new Device(socket))
        break;
      default:
        throw new Error('Unexpected query');
        break;
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
        break;
    }
    console.log(this.userConnections)
  }
}

module.exports = ConnectionManager
