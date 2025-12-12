const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Set a cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "suba", {
    maxAge: 1000 * 60 * 60,  // 1 hour
    httpOnly: true,          // More secure
  });

  res.send("Cookie has been set!");
});

// Read cookie
app.get("/get-cookie", (req, res) => {
  res.json({
    cookies: req.cookies
  });
});

// Delete cookie
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie deleted!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
