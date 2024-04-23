const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDB connection error");
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
