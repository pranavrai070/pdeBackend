const express = require('express');
const mongoose = require('mongoose');
// const http = require('http');
// const {Server} = require('socket.io');

const dbConfig = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const alertRoutes = require('./routes/alertRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const {socketFunction} = require('./sockets/socketHandler');

const app = express();
const server = require("http").Server(app);

const socketIO = require("socket.io")(server);
socketFunction(socketIO);


const PORT=7666;

mongoose.connect(dbConfig.dbURI, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
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

// Export both server and socketIO for external usage
module.exports = { server };
