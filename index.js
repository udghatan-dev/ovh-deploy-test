const express = require("express");
const app = express();
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

app.get("/", (req, res) => {
  res.send("we are listening");
});

var server = app.listen(process.env.PORT || 9001, () => {
  console.log("welcome to wa team backend we are listening on " + process.env.PORT || 9001);
});
