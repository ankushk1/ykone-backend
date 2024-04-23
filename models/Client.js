const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String,
  cin: String,
  email: String,
  address: {
    state: String,
    pinCode: String,
    address: String,
    country: String
  }
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
