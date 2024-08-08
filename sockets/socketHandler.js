const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

const emitNewAlert = (alert) => {
  io.emit('newAlert', alert);
};

const emitAlertAccepted = (alert) => {
  io.emit('alertAccepted', alert);
};

module.exports = {
  initSocket,
  emitNewAlert,
  emitAlertAccepted,
};
