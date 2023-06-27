//imports from packages
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io");

//import from other files
const authRouter = require("./routes/auth");
const adminRoute = require("./routes/admin");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const supportRouter = require("./routes/support");

//init
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const DB =
  "mongodb+srv://yazanfarrah03:OcqR6C85ei0OHPUS@cluster0.7nkhaij.mongodb.net/?retryWrites=true&w=majority";

// middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRoute);
app.use(productRouter);
app.use(userRouter);
app.use(supportRouter);

//connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB Connection successful");

    // Handle websocket connections
    io.on("connection", (socket) => {
      console.log("A user connected");

      // Handle chat messages
      socket.on("chat message", (msg) => {
        console.log("Received message:", msg);

        // Broadcast the message to all connected clients
        io.emit("chat message", msg);
      });

      // Handle disconnections
      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
