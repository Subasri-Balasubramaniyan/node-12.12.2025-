const argon2 = require("argon2");

const run = async () => {
  try {
    const password = "suba12345";

    // Hashing
    const hash = await argon2.hash(password);
    console.log("Hashed Password:", hash);

    // Verifying
    const isMatch = await argon2.verify(hash, "suba12345");
    console.log("Password Match:", isMatch);

  } catch (err) {
    console.error(err);
  }
};

run();
