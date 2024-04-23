const express = require("express");
const { extractData } = require("../controllers/dataController");
const router = express.Router();

router.get("/extractData", extractData);

module.exports = router;
