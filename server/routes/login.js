const express = require("express");
const router = express.Router();
const config = require("../config/db");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const session = require("express-session");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// DB CONNECTION
let conn = config.connection;

// Login
router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  conn.query("SELECT * FROM users WHERE email = ?", email, (error, result) => {
    if (error) {
      res.status(400).send(error);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result[0];
          res.json({ loggedIn: true, user: req.session.user });
        } else {
          res.json({ loggedIn: false });
        }
      });
    }
  });
});

router.get("/", (req, res) => {
  const { user } = req.session;

  if (user) {
    res.json(user);
  }
});

// LOGOUT
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.send(error);
      }
      {
        res.clearCookie("sessionId", { domain: "localhost", path: "/" });
        res.redirect("http://localhost:3000/login");
      }
    });
    req.session = null;
  }
});

module.exports = router;
