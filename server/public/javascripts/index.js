$(() => {
  const socket = io({
    query: {
      type: 'user',
    },
  });
  socket.emit('users/state:fetch', 'ff');
  socket.on('users/state:fetch/return', (state) => {
    $('.ff_power').text(state.power);
  });
  $('#2').on('click', () => {
    const device = {
      deviceId: 'ff',
      states: {
        power: 2,
      },
    };
    socket.emit('users/state:update', device);
    socket.on('users/state:update/return', () => {
      $('.ff_power').text('2');
    });
  })
});
