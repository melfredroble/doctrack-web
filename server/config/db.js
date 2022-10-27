const mysql = require("mysql");

config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "doctrack",
};

let connection = mysql.createConnection(config);

connection.connect(function (err) {
  if (err) {
    console.log("error connecting:" + err.stack);
  }
  console.log("connected successfully to DB.");
});

module.exports = {
  connection: mysql.createConnection(config),
};
