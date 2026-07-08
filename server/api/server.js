const express = require("express");
const cors = require("cors");
const server = express();
const authRouter = require("./auth/auth-router");
const applicationsRouter = require("./applications/applications-router");

server.use(express.json());
server.use(cors({ origin: "http://localhost:5173" }));
server.use("/api/auth", authRouter);
server.use("/api/applications", applicationsRouter);

module.exports = server;
