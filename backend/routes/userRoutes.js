const express = require("express");
const User = require("../models/User");  // Correct path
const router = express.Router();

router.post("/register1", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    res.json(user);
});

module.exports = router;

