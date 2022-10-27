const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const config = require("../config/db");
// DB CONNECTION
let conn = config.connection;

// SET SESSION STORE
const sessionStore = new MySQLStore(
  {
    expiration: 1000 * 60 * 60 * 24,
    createDatabaseTable: true,
    schema: {
      tableName: "sessiontbl",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  conn
);

const sessionMiddleware = session({
  key: "sessionId",
  secret: "secret",
  store: sessionStore,
  resave: false, //true
  saveUninitialized: false, //true
  cookie: {
    httpOnly: false, // true
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: true,
  },
});

const wrap = (sessionMiddleware) => (socket, next) =>
  sessionMiddleware(socket.request, {}, next);

const corsConfig = {
  origin: "http://localhost:3000",
  methods: ["get", "post", "put", "delete"],
  credentials: true,
};

module.exports = { sessionMiddleware, wrap, corsConfig };
