const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cluster = require("node:cluster");
const http = require("node:http");
const { cpus } = require("node:os");
const process = require("node:process");

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("hello world\n");
    })
    .listen(process.env.PORT || 9001);

  console.log(`Worker ${process.pid} started`);
}

dotenv.config();

app.get("/", (req, res) => {
  res.send("we are listening");
});

// var server = app.listen(process.env.PORT || 9001, () => {
//   console.log("welcome to wa team backend we are listening on " + process.env.PORT || 9001);
// });
