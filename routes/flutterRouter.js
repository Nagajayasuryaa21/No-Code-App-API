const express = require("express");
const router = express.Router();
const { FlutterConfig } = require("../models/futterConfig"); // Assuming your model file is in a folder called 'models'

router.get("/get/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

  try {
    // Get the 'id' parameter from the URL
    const id = req.params.id;

    // Check if the ID is valid
    if (!id) {
      return res.status(400).send({ status: "failed", message: "Invalid ID" });
    }
    // Find the FlutterConfig by ID
    const config = await FlutterConfig.findOne({ id: id });
    // const config = await FlutterConfig.find();
    if (!config) {
      return res.status(404).send({ status: "failed", message: "Config not found" });
    }

    res.status(200).send(config);
  } catch (error) {
    res.status(500).send({ status: "failed", message: "Internal Server Error: " + error.message });
  }
});

module.exports = router;
