const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure session
app.use(
  session({
    secret: "mysecretkey123",        // encryption key for session
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,        // 1 hour
      httpOnly: true                 // cannot be accessed by JS
    }
  })
);

// Fake user data
const USERS = [
  { id: 1, email: "suba@gmail.com", password: "123456" }
];

// LOGIN Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = USERS.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Create session
  req.session.user = {
    id: user.id,
    email: user.email,
  };

  res.json({ message: "Login successful!" });
});

// PROTECTED Route
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ message: "Not logged in" });
  }

  res.json({
    message: "Welcome to your dashboard",
    user: req.session.user
  });
});

// LOGOUT Route
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");  // default session cookie
    res.json({ message: "Logged out successfully" });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
