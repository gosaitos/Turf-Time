

const mongoose = require("mongoose");

const turfSchema = new mongoose.Schema({
    name: String,
    address: String,
    rentperhour: Number,
    type: String,
    imageurls: [String],
    description: String,
});

module.exports = mongoose.model("Turf", turfSchema , "test");
