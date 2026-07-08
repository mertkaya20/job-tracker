const Users = require("../users/users-model");
const jwt = require("jsonwebtoken");

const validateRegister = (req, res, next) => {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  req.body.email = req.body.email.toLowerCase().trim();

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters, include one uppercase letter and one number",
    });
  }

  next();
};

const checkEmailUnique = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await Users.getByFilter({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exist" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const checkUsernameUnique = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await Users.getByFilter({ username });

    if (user) {
      return res.status(400).json({ message: "Username already exist" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validateLogin = (req, res, next) => {
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  req.body.email = req.body.email.toLowerCase().trim();

  next();
};

const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        message: "Token invalid",
      });
    }

    req.decodedToken = decodedToken;
    next();
  });
};

module.exports = {
  validateRegister,
  validateLogin,
  checkEmailUnique,
  checkUsernameUnique,
  checkToken,
};
