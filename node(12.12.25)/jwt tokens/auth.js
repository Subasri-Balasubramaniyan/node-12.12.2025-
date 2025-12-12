const jwt = require("jsonwebtoken");

// Generate JWT
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }   // Token expires in 1 hour
  );
}

module.exports = { generateToken };
