const ConnectionManager = require('../../lib/ConnectionManager');
const { EventEmitter } = require('events');

test('Manage connections certainly', () => {
  const cm = new ConnectionManager();
  const socket = new EventEmitter();
  Object.assign(socket, {
    id: 'abc',
    handshake: {
      query: {
        type: 'user',
      },
    },
  });
  cm.addConnection(socket);
  expect([...cm.userConnections.keys()]).toEqual(['abc']);
  socket.emit('disconnect');
  expect([...cm.userConnections.keys()]).toEqual([]);
});
