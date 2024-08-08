const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const dbConfig = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const alertRoutes = require('./routes/alertRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const {initSocket} = require('./sockets/socketHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Socket.io setup for real-time communication
initSocket(io);

mongoose.connect(dbConfig.dbURI, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected');
    server.listen(7666, () => {
      console.log('Server running on port 7666');
    });
  })
  .catch(err => console.log(err));

app.use(express.json());

app.get('/',(req,res)=>{
  return res.status(200).json({message:"PDE Server is Running FIne"})
})

const checkfuntion=(req,_res,next)=>{
  console.log("server gets hits",req.path,req.originalUrl);
  console.log("getting body for request",req.body);
  next();
}

// Routes
app.use('/auth',checkfuntion, authRoutes);
app.use('/alerts',checkfuntion, alertRoutes);
app.use('/appointments', checkfuntion,appointmentRoutes);
app.use('/users',checkfuntion,userRoutes);
app.use('/reviews',checkfuntion, reviewRoutes);

module.exports = server; // Export server for testing purposes
