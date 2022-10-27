const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/db");
const dotenv = require("dotenv").config();
const login = require("./routes/login");
const bcrypt = require("bcrypt");
const document = require("./routes/document");
const { sessionMiddleware, wrap, corsConfig } = require("./controller/session");
const session = require("express-session");

// DB CONNECTION
let conn = config.connection;
//
const port = 3001;

const server = http.createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// SET SESSION
app.use(sessionMiddleware);

app.use("/document", document);
app.use("/login", login);

io.use(wrap(sessionMiddleware));

let users = [];

io.on("connection", (socket) => {
  socket.on("connected", (myId) => {
    // socket.join(data);
    users[myId] = socket.id;
    console.log(myId);
  });

  socket.on("send_document", (data) => {
    conn.query(
      "SELECT * FROM users WHERE id = ?",
      data.receiverId,
      (error, receiver) => {
        if (receiver.length > 0) {
          conn.query(
            "SELECT * FROM users WHERE id = ?",
            data.myId,
            (error, sender) => {
              if (sender.length > 0) {
                const document = {
                  sender: sender[0].name,
                  document: data.document,
                };
                io.to(users[receiver[0].id]).emit(
                  "document_received",
                  document
                );
              }
            }
          );
        }
      }
    );
  });
});

// Persist Session
// app.use((req, res, next) => {
//   const session = req.session;
//   if (session) {
//     next();
//   }
// });

// Port listen
server.listen(port, () => {
  console.log("Server running on port " + port);
});
