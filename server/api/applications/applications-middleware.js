const validateApplication = (req, res, next) => {
  if (!req.body || !req.body.position || !req.body.company_name) {
    return res
      .status(400)
      .json({ message: "Position and company name required" });
  }

  next();
};

const validateUpdate = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No changes provided" });
  }

  next();
};

module.exports = { validateApplication, validateUpdate };
