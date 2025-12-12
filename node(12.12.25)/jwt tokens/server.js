const express = require("express");
const dotenv = require("dotenv");
const { generateToken } = require("./auth");
const authenticate = require("./authMiddleware");

dotenv.config();

const app = express();
app.use(express.json());

// Fake user database
const USERS = [
  { id: 1, email: "admin@gmail.com", password: "123456", role: "admin" }
];

// LOGIN route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = USERS.find((u) => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Generate token
  const token = generateToken(user);

  res.json({ message: "Login Success", token });
});

// Protected Route
app.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user,
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
