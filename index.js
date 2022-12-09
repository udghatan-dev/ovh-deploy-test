const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("we are running");
});

var server = app.listen(process.env.PORT || 9000, () => {
  console.log("welcome to wa team backend we are listening on " + process.env.PORT || 9000);
});
