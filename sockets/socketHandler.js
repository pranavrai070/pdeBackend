let connectedSockets = [];

const socketFunction=(socketIO)=>{
  // Global variable to store connected sockets
socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user is just connected`);
  connectedSockets.push(socket);
  console.log("connected socekts length",connectedSockets.length);
  // console.log("connected socekts",connectedSockets);

  socket.on('new_alert', (item) => {
    socket.emit('groupList', item);
  });

  socket.on('alert_accepted', (alert) => {
    socket.emit('groupList', alert);
  });

  // Handle user disconnection
  socket.on('disconnect', (reason) => {
    console.log(`${socket.id} user disconnected due to ${reason}`);
    // Remove the socket from the list of connected sockets
    connectedSockets = connectedSockets.filter(s => s !== socket);
  });
});
};

// Function to emit new alert to all connected clients
const emitNewAlert = (alert) => {
  console.log('new alert got triggered', alert);
  connectedSockets.forEach((socket) => socket.emit('new_alert', alert));
};

// Function to emit new alert to all connected clients
const emitAcceptAlert = (alert) => {
  console.log('accept alert got triggered', alert);
  connectedSockets.forEach((socket) => socket.emit('alert_accepted', alert));
};

module.exports={socketFunction,emitNewAlert,emitAcceptAlert};