const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

//verify token
//hydi l verify bhetta bl route li fi get w put w delete
const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json({ error: "Authorization token required" });
  }
  //auth have two part (Baerer token) so we split on space and get the second part
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};
