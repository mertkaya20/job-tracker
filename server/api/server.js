const express = require("express");
const cors = require("cors");
const server = express();
const authRouter = require("./auth/auth-router");
const applicationsRouter = require("./applications/applications-router");
const usersRouter = require("./users/users-router");

server.use(express.json());
server.use(
  cors({
    origin: ["http://localhost:5173", "https://job-tracker-mert.vercel.app"],
  }),
);
server.use("/api/auth", authRouter);
server.use("/api/applications", applicationsRouter);
server.use("/api/users", usersRouter);

module.exports = server;
