const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

// Create a booking
router.post("/book", async (req, res) => {
  const { userId, turfId, bookingTime, paymentMethod } = req.body;

  try {
    const newBooking = new Booking({
      userId,
      turfId,
      bookingTime,
      paymentMethod
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
