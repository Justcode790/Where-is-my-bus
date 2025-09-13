const express = require("express");
const { register, login ,getMe, logout} = require("../controllers/authController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, getMe);
router.post("/logout", logout);

// Protected route (any logged-in user)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ msg: "Your profile data", user: req.user });
});

// Only official can access
// router.get("/official", authMiddleware, roleMiddleware(["official"]), (req, res) => {
//   res.json({ msg: "Welcome Official", user: req.user });
// });

// // Only driver can access
// router.get("/driver", authMiddleware, roleMiddleware(["driver"]), (req, res) => {
//   res.json({ msg: "Welcome Driver", user: req.user });
// });

module.exports = router;
