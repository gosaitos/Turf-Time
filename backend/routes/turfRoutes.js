const express = require("express");
const Turf = require("../models/Turf"); // Make sure your Turf model is set up correctly
const router = express.Router();

// Get all turfs
router.get("/turfs", async (req, res) => {
  try {
    const turfs = await Turf.find();
    res.json(turfs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  
module.exports = router;
