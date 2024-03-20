import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import chatMessageRoute from "./routes/chatMessage.js";
import http from "http";
import { WebSocket, WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import MessageModel from "./model/messageModel.js";
import cors from "cors";
let server = http.createServer();
// DB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const app = express();

// allowed all origins
app.use(cors());

// messages route and methods to handle messages data on the database
app.use("/messages", chatMessageRoute);

// Homepage route to confirm the server working state
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is active: Homepage" });
});

server.on("request", app);
// Websocket server setup
const wsServer = new WebSocketServer({ server: server });
server.listen(process.env.PORT, () => {
  console.log(`WebSocket server is running on port ${process.env.PORT}`);
});

const users = {}; //all current users

// save messages to Database
async function saveMessageToDB(data) {
  const newMessage = new MessageModel(data);
  await newMessage.save();
}

// broadcast messages to all ready clients
async function broadcastMessage(json) {
  const data = JSON.stringify(json);
  for (let userId in users) {
    let user = users[userId];
    if (user.readyState === WebSocket.OPEN) {
      user.send(data);
    }
  }
  saveMessageToDB(json);
}

// handle new messages and broadcast to all active clients
function handleNewMessage(message, userId) {
  broadcastMessage({
    userId: userId,
    type: 2,
    time: new Date().toLocaleTimeString(),
    message: Buffer.from(message).toString(),
  });
}

// handle new connection and return back the saved userId to frontend to that specific user
function handleNewConnection(userId) {
  return broadcastMessage({
    userId: userId,
    type: 1,
    time: new Date().toLocaleTimeString(),
    message: `${userId} joined`,
  });
}

// handle disconnect and bradcast messages to all active clients
function handleDisconnect(userId) {
  delete users[userId];
  broadcastMessage({
    userId: userId,
    type: 3,
    time: new Date().toLocaleTimeString(),
    message: `${userId} left`,
  });
}

// websocket request handler
wsServer.on("connection", function (connection) {
  const userId = uuidv4();
  users[userId] = connection;
  connection.send(JSON.stringify({ userId: userId, type: 4 }));
  handleNewConnection(userId);

  connection.on("message", (message) => {
    console.log(message);
    handleNewMessage(message, userId);
  });

  connection.on("close", () => handleDisconnect(userId));
});
