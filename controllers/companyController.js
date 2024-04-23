const Client = require("../models/Client");

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(200).json({ message: "Created successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.getClients = async (req, res) => {
  try {
    const queryParams = req.query;
    const clients = await Client.find(queryParams || {});
    if (!clients.length) {
      return res.status(404).json({ message: "No clients found" });
    }
    res.status(200).json({ clients, message: "Fetched successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.getClientByID = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ client, message: "Client fetched successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ client, message: "Client updated successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ client, message: "Client deleted successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};
