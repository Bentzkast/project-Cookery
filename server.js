const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

const app = express();

const dbURI = require("./config/keys").mongoURI;
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello cookie"));

// use route
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
