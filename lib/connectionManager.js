const Device = require('./device')
const User = require('./user')
class ConnectionManager {
  constructor () {
    this.deviceConnections = new Map()
    this.userConnections = new Map()
  }
  addConnection (socket) {
    const query = socket.handshake.query
    switch (query.token) {
      case 'user':
        this.userConnections.set(socket.id, new User(socket))
        break;
      case 'device':
        this.deviceConnections.set(query.deviceId, new Device(socket))
        break;
      default:
        break;
    }
    console.log(this.userConnections)
  }
  removeConnection (socket) {
    const query = socket.handshake.query
    switch (query.token) {
      case 'user':
        this.userConnections.delete(socket.id)
        break;
      case 'device':
        this.deviceConnections.delete(query.deviceId)
        break;
      default:
        break;
    }
    console.log(this.userConnections)
  }
}

module.exports = ConnectionManager
