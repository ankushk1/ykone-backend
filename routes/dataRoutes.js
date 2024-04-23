const express = require("express");
const { extractData } = require("../controllers/dataController");
const {
  getClients,
  createClient,
  getClientByID,
  updateClient,
  deleteClient
} = require("../controllers/companyController");
const router = express.Router();

router.get("/extractData", extractData);

// Client Routes
router.get("/clients", getClients);
router.post("/clients", createClient);
router.get("/clients/:id", getClientByID);
router.post("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

module.exports = router;
