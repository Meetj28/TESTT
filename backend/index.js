import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import axios from "axios";
import mongoose from "mongoose";



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity
  },
});

const rooms = new Map(); // Map to store room data (users and code)

const port = process.env.PORT || 5000;

const url = `https://chalega-tu.onrender.com`;
//const url = `http://localhost:5000`; // Replace with your server URL

const reloadInterval = 30000;

mongoose.connect("mongodb+srv://dbms17d19a:@Aimjee_21@cluster0.3d2nt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/codeEditor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  users: [{ type: String }],
  code: { type: String, default: "// start code here" },
});

const Room = mongoose.model("Room", roomSchema);

const requestQueue = []; // Queue for processing requests
let isProcessingQueue = false;

const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  isProcessingQueue = true;

  const { roomId, updatedCode } = requestQueue.shift();
  console.log(`Processing request for room: ${roomId}`);

  try {
    await Room.findOneAndUpdate(
      { roomId },
      { code: updatedCode },
      { new: true, upsert: true }
    );
  } catch (error) {
    console.error("Error updating MongoDB:", error);
  }

  isProcessingQueue = false;
  if (requestQueue.length > 0) processQueue();
};


function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log(`Reloaded at ${new Date().toISOString()}: 
      Status Code ${response.status}`);
    })
    .catch((error) => {
      console.error(`Error reloading at ${new Date().toISOString()}:`
      , error.message);
    });
}

setInterval(reloadWebsite, reloadInterval);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  let currentRoom = null;
  let currentUser = null;

  // Handle user joining a room
  socket.on("join", async ({ roomId, userName }) => {
    console.log(`User ${userName} joining room: ${roomId}`);
    if (currentRoom) {
      socket.leave(currentRoom);
      rooms.get(currentRoom)?.delete(currentUser);
      io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom) || []));
    }

    currentRoom = roomId;
    currentUser = userName;

    socket.join(roomId);

    let room = await Room.findOne({ roomId });
    if (!room) {
      room = new Room({ roomId, users: [userName] });
      await room.save();
    } else {
      room.users.push(userName);
      room.users = [...new Set(room.users)]; // Avoid duplicates
      await room.save();
    }

    io.to(roomId).emit("userJoined", room.users);
    socket.emit("codeUpdate", room.code);// Send current code to the user
  });

 

  // Handle code changes
  socket.on("codeChange", ({ roomId, code }) => {
    console.log(`Code updated in room ${roomId} by ${currentUser}`);
    
    rooms.get(roomId).code = code; // Update room's code
    socket.to(roomId).emit("codeUpdate", code); // Broadcast updated code to other users
    requestQueue.push({ roomId, updatedCode: code });
    processQueue();
  });

  // Handle cursor movement
  socket.on("cursorMove", ({ roomId, userId, position }) => {
    console.log(`Cursor moved in room ${roomId} by ${userId} to position ${position}`);
    socket.to(roomId).emit("cursorUpdate", { userId, position });
  });

  // Handle selection changes
  socket.on("selectionChange", ({ roomId, userId, selection }) => {
    console.log(`Selection changed in room ${roomId} by ${userId}: Start ${selection.start}, End ${selection.end}`);
    socket.to(roomId).emit("selectionUpdate", { userId, selection });
  });

  // Handle user leaving a room
  socket.on("leaveRoom", () => {
    console.log(`User ${currentUser} leaving room ${currentRoom}`);
    if (currentRoom && currentUser) {
      rooms.get(currentRoom)?.users.delete(currentUser);
      io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom).users));
      socket.leave(currentRoom);
    }//inko andar rkna h 
    currentRoom = null;
    currentUser = null;
  });

  socket.on("typing", ({ roomId, userName }) => {
    socket.to(roomId).emit("userTyping", userName);
  });

  socket.on("languageChange", ({ roomId, language }) => {
    io.to(roomId).emit("languageUpdate", language);
  });


  // Handle user disconnect
  socket.on("disconnect", async () => {
    console.log(`User disconnected: ${socket.id}`);
    if (currentRoom && currentUser) {
      const room = await Room.findOne({ roomId: currentRoom });
      if (room) {
        room.users = room.users.filter((user) => user !== currentUser);
        await room.save();
      // rooms.get(currentRoom)?.users.delete(currentUser);
      io.to(currentRoom).emit("userJoined", room.users);
    }
   }
  });
});

// Serve static files (e.g., for a React frontend)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Fallback route to serve the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


