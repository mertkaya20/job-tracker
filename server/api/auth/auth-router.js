const express = require("express");
const authRouter = express.Router();
const authMiddlewares = require("./auth-middleware");
const { register, login } = require("./auth-controller");

authRouter.post(
  "/register",
  authMiddlewares.validateRegister,
  authMiddlewares.checkEmailUnique,
  authMiddlewares.checkUsernameUnique,
  register,
);

authRouter.post("/login", authMiddlewares.validateLogin, login);

module.exports = authRouter;
