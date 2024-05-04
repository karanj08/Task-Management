import jwt from "jsonwebtoken";

const authanticatToken = (req, res, next) => {
  const authanticateToken = req.headers["authorization"];

  const token = authanticateToken?.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, "karan", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "err" });
    }
    req.user = user;
    next();
  });
};
export default authanticatToken;
