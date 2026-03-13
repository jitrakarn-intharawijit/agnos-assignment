const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("client connected:", socket.id);

  socket.on("patient-update", (data) => {
    socket.broadcast.emit("patient-update", data);
  });

  socket.on("patient-status", (status) => {
    socket.broadcast.emit("patient-status", status);
  });

  socket.on("patient-submitted", (data) => {
    socket.broadcast.emit("patient-update", data);
    socket.broadcast.emit("patient-status", "submitted");
  });

  socket.on("disconnect", () => {
    console.log("client disconnected:", socket.id);
  });
});
