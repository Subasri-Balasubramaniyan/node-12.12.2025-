Authentication – README

This guide explains the core authentication concepts used in modern web applications, including:

Password Hashing (bcrypt, argon2)

JWT (JSON Web Tokens)

Session-Based Authentication

Cookies & Secure Cookie Management

## 📌 1. Password Hashing

Passwords must never be stored as plain text.
Instead, they should be hashed (one-way encryption).

### 🔐 1.1 bcrypt Hashing (Node.js)

Install:

npm install bcrypt


Hashing a Password

const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};


Verify Password

const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

### 🔐 1.2 argon2 Hashing (More Secure Than bcrypt)

Install:

npm install argon2


Hashing

const argon2 = require("argon2");

const hashed = await argon2.hash(password);


Verify

const isMatch = await argon2.verify(hashedPassword, plainPassword);


Why Argon2?

Best-in-class security

Resistant to GPU attacks

Winner of the Password Hashing Competition (PHC)

## 📌 2. JWT Authentication (Token-Based Auth)

JWT = JSON Web Token
Used for stateless authentication (no server memory needed).

### How JWT Works

User logs in → Server validates password

Server generates a JWT

Client stores it (usually in a cookie or localStorage)

Client sends token in every request

Server verifies token → allows access

### 📦 Install JWT
npm install jsonwebtoken

### Generate Token
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

### Verify Token (middleware)
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

## 📌 3. Session-Based Authentication

Sessions store authentication data on the server.

### Install Required Packages
npm install express-session connect-mongo

### Example Session Setup
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false, // true in production with HTTPS
    },
  })
);

### Login Flow Using Sessions
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  req.session.userId = user._id;
  res.json({ message: "Logged in" });
});

### Protect Route via Session
const isAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

## 📌 4. Cookie Management

Cookies store data on the client side.

### Use Cases

Store JWT tokens

Store session IDs

Remember user preferences

### Secure Cookie Options
res.cookie("token", jwtToken, {
  httpOnly: true,  // JavaScript cannot access; prevents XSS
  secure: true,    // Only HTTPS
  sameSite: "strict", // Prevent CSRF
  maxAge: 3600000, // 1 hour
});

### Accessing Cookies

Install cookie parser:

npm install cookie-parser


Middleware:

const cookieParser = require("cookie-parser");
app.use(cookieParser());


Read cookie inside a route:

const token = req.cookies.token;

## 📌 5. JWT vs Session – When to Use What?
Feature	JWT	Sessions
Stored	Client	Server
Stateless	Yes	No
Best for	APIs, mobile apps	Websites, dashboards
Speed	Fast	Slightly slower
Logout	Harder	Easy
## ✔ Summary
You learned:

✅ Password hashing using

bcrypt

argon2

✅ Token-based authentication using JWT

Signing

Verifying

Protecting routes

✅ Session-based authentication

express-session

Mongo session store

✅ Secure cookie management

httpOnly

secure

sameSite
