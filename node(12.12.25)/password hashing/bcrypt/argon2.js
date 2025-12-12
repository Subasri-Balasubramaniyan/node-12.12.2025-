const argon2 = require("argon2");

const hashPass = async () => {
  const hash = await argon2.hash("secret123");
  console.log(hash);
  console.log(await argon2.verify(hash, "secret123")); // true
};
