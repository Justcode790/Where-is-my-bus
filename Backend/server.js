const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");
const routeRoutes = require("./routes/routeRoutes");
const driverRoutes = require("./routes/driverRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true  // 🔑 allow cookies
}));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,       // JS on frontend cannot read
    secure: false,        // true if using HTTPS
    sameSite: "lax",      // adjust as needed
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// Routes
app.use("/pi/official/buses", busRoutes);
app.use("/pi/official/routes", routeRoutes);
app.use("/pi/official/drivers", driverRoutes);
app.use("/pi", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working fine with sessions!");
});

// Connect DB and start server
connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend running on port ${port}`));





// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");
// const cors = require("cors");
// const busRoutes = require("./routes/busRoutes");
// const routeRoutes = require("./routes/routeRoutes");
// const driverRoutes = require("./routes/driverRoutes");
// const cookieParser = require("cookie-parser");

// dotenv.config();

// // Middleware
// app.use(cors({
//   origin: "http://localhost:5173",  // frontend origin
//   credentials: true,                // allow cookies to be sent
// }));
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/pi/official/buses", busRoutes);
// app.use("/pi/official/routes", routeRoutes);
// app.use("/pi/official/drivers", driverRoutes);
// app.use("/pi", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend is working fine with cookies ✅");
// });

// // Connect DB and start server
// connectDB();
// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Backend running on port ${port}`));
