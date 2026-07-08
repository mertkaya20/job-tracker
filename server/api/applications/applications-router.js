const express = require("express");
const applicationsRouter = express.Router();
const applicationsMiddlewares = require("./applications-middleware");
const {
  getApplications,
  getApplicationById,
  addApplication,
  updateApplication,
  deleteApplication,
  getStats,
} = require("./applications-controller");
const { checkToken } = require("../auth/auth-middleware");

applicationsRouter.get("/", checkToken, getApplications);

applicationsRouter.get("/stats", checkToken, getStats);

applicationsRouter.get("/:id", checkToken, getApplicationById);

applicationsRouter.post(
  "/",
  checkToken,
  applicationsMiddlewares.validateApplication,
  addApplication,
);

applicationsRouter.put(
  "/:id",
  checkToken,
  applicationsMiddlewares.validateUpdate,
  updateApplication,
);

applicationsRouter.delete("/:id", checkToken, deleteApplication);

module.exports = applicationsRouter;
