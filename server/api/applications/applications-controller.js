const Applications = require("./applications-model");

const getApplications = async (req, res, next) => {
  try {
    const applications = await Applications.getAll(req.decodedToken.id);
    if (applications.length === 0) {
      return res.status(200).json({ message: "There is no application." });
    }
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

const getApplicationById = async (req, res, next) => {
  try {
    const application = await Applications.getById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.user_id !== req.decodedToken.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(application);
  } catch (error) {
    next(error);
  }
};

const addApplication = async (req, res, next) => {
  try {
    const newApplication = {
      ...req.body,
      user_id: req.decodedToken.id,
    };

    const createdApplication =
      await Applications.addApplications(newApplication);

    res.status(201).json(createdApplication);
  } catch (error) {
    next(error);
  }
};

const updateApplication = async (req, res, next) => {
  try {
    const application = await Applications.getById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (req.decodedToken.id !== application.user_id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedApplication = await Applications.updateApplication(
      req.params.id,
      req.body,
    );

    res.status(200).json(updatedApplication);
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const application = await Applications.getById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (req.decodedToken.id !== application.user_id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedApplication = await Applications.deleteApplication(
      req.params.id,
    );
    res.status(200).json(deletedApplication);
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const response = await Applications.getStats(req.decodedToken.id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getApplications,
  getApplicationById,
  getStats,
  addApplication,
  deleteApplication,
  updateApplication,
};
