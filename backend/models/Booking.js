const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    turfId: String,
    userId: String,
    slot1 : Boolean,
    slot2 : Boolean,
    slot3 : Boolean,
    slot4 : Boolean,
    date : String,
    name : String,
    phno : Number,
});

module.exports = mongoose.model("Booking", bookingSchema, "bookings" );
