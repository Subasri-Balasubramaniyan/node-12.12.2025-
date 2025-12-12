const bcrypt = require("bcrypt");

const run = async () => {
  const password = "suba12345";

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  // Verify password
  const isMatch = await bcrypt.compare("suba12345", hashedPassword);
  console.log("Password Match:", isMatch);
};

run(); // 🔥 IMPORTANT: call the function
