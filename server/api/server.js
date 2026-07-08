const express = require("express");
const server = express();
const authRouter = require("./auth/auth-router");
const applicationsRouter = require("./applications/applications-router");

server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/applications", applicationsRouter);

module.exports = server;
