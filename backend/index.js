// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import path from "path";
// import axios from 'axios';

// const app = express();

// const server = http.createServer(app);

// const url = `https://realtime-code-editor-utu5.onrender.com`;
// const interval = 30000;

// function reloadWebsite() {
//   axios
//     .get(url)
//     .then((response) => {
//       console.log(
//         `Reloaded at ${new Date().toISOString()}: Status Code ${
//           response.status
//         }`
//       );
//     })
//     .catch((error) => {
//       console.error(
//         `Error reloading at ${new Date().toISOString()}:`,
//         error.message
//       );
//     });
// }

// setInterval(reloadWebsite, interval);


// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// const rooms = new Map();

// io.on("connection", (socket) => {
//   console.log("User Connected", socket.id);

//   let currentRoom = null;
//   let currentUser = null;

//   socket.on("join", ({ roomId, userName }) => {
//     if (currentRoom) {
//       socket.leave(currentRoom);
//       rooms.get(currentRoom).delete(currentUser);
//       io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
//     }

//     currentRoom = roomId;
//     currentUser = userName;

//     socket.join(roomId);

//     if (!rooms.has(roomId)) {
//       rooms.set(roomId, new Set());
//     }

//     rooms.get(roomId).add(userName);

//     io.to(roomId).emit("userJoined", Array.from(rooms.get(currentRoom)));
//   });

//   socket.on("codeChange", ({ roomId, code }) => {
//     socket.to(roomId).emit("codeUpdate", code);
//   });

//   socket.on("leaveRoom", () => {
//     if (currentRoom && currentUser) {
//       rooms.get(currentRoom).delete(currentUser);
//       io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));

//       socket.leave(currentRoom);

//       currentRoom = null;
//       currentUser = null;
//     }
//   });

//   socket.on("typing", ({ roomId, userName }) => {
//     socket.to(roomId).emit("userTyping", userName);
//   });

//   socket.on("languageChange", ({ roomId, language }) => {
//     io.to(roomId).emit("languageUpdate", language);
//   });

//   socket.on("disconnect", () => {
//     if (currentRoom && currentUser) {
//       rooms.get(currentRoom).delete(currentUser);
//       io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
//     }
//     console.log("user Disconnected");
//   });
// });

// const port = process.env.PORT || 5000;

// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// server.listen(port, () => {
//   console.log("server is working on port 5000");
// });



import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import axios from "axios";

const app = express();
const server = http.createServer(app);

const url = `https://testt-xxvk.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

setInterval(reloadWebsite, interval);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = new Map();

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  let currentRoom = null;
  let currentUser = null;

  socket.on("join", ({ roomId, userName }) => {
    if (currentRoom) {
      socket.leave(currentRoom);
      rooms.get(currentRoom).delete(currentUser);
      io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
    }

    currentRoom = roomId;
    currentUser = userName;

    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map());
    }

    rooms.get(roomId).set(userName, { position: { lineNumber: 1, column: 1 } });

    io.to(roomId).emit("userJoined", Array.from(rooms.get(currentRoom).keys()));
  });

  socket.on("codeChange", ({ roomId, code }) => {
    socket.to(roomId).emit("codeUpdate", code);
  });

  socket.on("leaveRoom", () => {
    if (currentRoom && currentUser) {
      rooms.get(currentRoom).delete(currentUser);
      io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom).keys()));

      socket.leave(currentRoom);

      currentRoom = null;
      currentUser = null;
    }
  });

  socket.on("typing", ({ roomId, userName }) => {
    socket.to(roomId).emit("userTyping", userName);
  });

  socket.on("languageChange", ({ roomId, language }) => {
    io.to(roomId).emit("languageUpdate", language);
  });

  socket.on("cursorChange", ({ roomId, userName, position }) => {
    if (rooms.has(roomId) && rooms.get(roomId).has(userName)) {
      rooms.get(roomId).set(userName, { position });

      const userCursors = Array.from(rooms.get(roomId)).map(([user, data]) => ({
        user,
        position: data.position,
      }));

      io.to(roomId).emit("updateCursors", userCursors);
    }
  });

  socket.on("disconnect", () => {
    if (currentRoom && currentUser) {
      rooms.get(currentRoom).delete(currentUser);
      io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom).keys()));
    }
    console.log("User Disconnected", socket.id);
  });
});

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  console.log("Server is working on port", port);
});