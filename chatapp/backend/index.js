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
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/messages", chatMessageRoute);

app.get("/deleteallmessages/1503rajeev1409", async (req, res) => {
  try {
    const deleteAllMessages = await MessageModel.deleteMany();
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Index.html" });
});

const wsServer = new WebSocketServer({ port: 8080 });
const port = 8000;
app.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

const users = {}; //all current users

async function saveMessageToDB(data) {
  // if (data.type !== 2) return;
  const newMessage = new MessageModel(data);
  await newMessage.save();
}

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

function handleNewMessage(message, userId) {
  broadcastMessage({
    userId: userId,
    type: 2,
    time: new Date().toLocaleTimeString(),
    message: Buffer.from(message).toString(),
  });
}

function handleNewConnection(userId) {
  return broadcastMessage({
    userId: userId,
    type: 1,
    time: new Date().toLocaleTimeString(),
    message: `${userId} joined`,
  });
}
function handleDisconnect(userId) {
  delete users[userId];
  broadcastMessage({
    userId: userId,
    type: 3,
    time: new Date().toLocaleTimeString(),
    message: `${userId} left`,
  });
}

wsServer.on("connection", function (connection) {
  const userId = uuidv4();
  users[userId] = connection;
  connection.send(JSON.stringify({ userId: userId, type: 4 }));
  handleNewConnection(userId);
  //
  connection.on("message", (message) => {
    console.log(message);
    handleNewMessage(message, userId);
  });
  //
  connection.on("close", () => handleDisconnect(userId));
});
