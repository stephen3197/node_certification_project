require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const socketio = require('socket.io');


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", require("./routes/customer"))

const PORT = process.env.PORT || 6000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const io = socketio(server);
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('chatMessage', (msg) => {
    io.emit('message', {
      text: msg.text,
      user: msg.user,
      time: new Date().toLocaleTimeString()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});