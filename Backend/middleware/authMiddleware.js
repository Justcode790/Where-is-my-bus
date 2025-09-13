const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  // 1. Try cookie first
  const token = req.cookies?.token 
    || req.header("Authorization")?.split(" ")[1]; // fallback for Bearer

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: user._id, role: user.role }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};
