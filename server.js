const express = require("express");
const mongoose = require("mongoose");

const app = express();

const dbURI = require("./config/keys").mongoURI;
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello cookie"));

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
