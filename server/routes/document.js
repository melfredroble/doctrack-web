const express = require("express");
const router = express.Router();
const config = require("../config/db");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// DB CONNECTION
let conn = config.connection;

// add document
router.post("/add", (req, res) => {
  const doctype = req.body.doctype;
  const desc = req.body.desc;
  const office = req.body.office;

  io.on("connection", (socket) => {
    console.log(socket.id);
  });
});

module.exports = router;
