const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser')
require("./config/mongoose");
const dataRoutes = require("./routes/dataRoutes");

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use("/", dataRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
