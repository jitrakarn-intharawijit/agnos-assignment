const { Server } = require("socket.io");

const io = new Server(4000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("patient-update", (data) => {
    io.emit("patient-update", data);
  });
});