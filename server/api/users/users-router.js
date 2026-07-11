const express = require("express");
const usersRouter = express.Router();
const { changePassword } = require("./users-controller");
const { checkToken } = require("../auth/auth-middleware");

usersRouter.put("/change-password", checkToken, changePassword);

module.exports = usersRouter;
