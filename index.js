const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config();

const db = require("./config/mongoose");
const dataRoutes = require("./routes/dataRoutes");

app.use("/", dataRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
