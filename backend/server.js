const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend")));


const Turf = require("./models/Turf");

const User = require("./models/User");

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});


app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
      
        const userdata = await User.findOne({email : email , password : password});
      
        if(!userdata){
            res.status(404).json({ message: "Invalid credentials"  });
        }else {
          console.log('user id ', userdata._id.toString());
        res.status(201).json({ userid :userdata._id.toString(),   message: "User Login successfully!" });}
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  });

app.get("/api/Turf", async (req, res) => {
    try {
      const turfs = await Turf.find();
      res.json(turfs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  app.get('/api/venues/:id', async (req, res) => {
    try {
        const venue = await Turf.findById(req.params.id);
        if (!venue) {
            return res.status(404).json({ message: "Venue not found" });
        }
        console.log("VENUE : ",venue);
        res.status(200).json(venue);
    } catch (err) {
        res.status(500).json({ message: "Error fetching venue data", error: err });
    }
});

const Booking = require('./models/Booking');

app.post("/check-availability", async (req, res) => {
  const { turfId, date } = req.body;

  console.log("STRING DAE : ", date);
  console.log("TURF ID : " , turfId);
  try {

    const existingBookings = await Booking.find({
      turfId: turfId,
      date: date
    });

    if(!existingBookings){
      return res.status(201).json({ status : 'ok' , data : []});
    }

    let Unavailableslots = [];

    existingBookings.forEach(booking => {
      if (booking.slot1) {
        Unavailableslots.push("slot1");
      }
      if (booking.slot2) {
        Unavailableslots.push("slot2");
      }
      if (booking.slot3) {
        Unavailableslots.push("slot3");
      }
      if (booking.slot4) {
        Unavailableslots.push("slot4");
      }
    });
    
   
    return res.status(201).json({ status :'ok' , data : Unavailableslots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/book", async (req, res) => {
  const { turfId, userId, date, slot1, slot2, slot3, slot4, name, phno } = req.body;

  try {
    const selectedDate = new Date(date);
    selectedDate.setUTCHours(0, 0, 0, 0);
    const isoDate = selectedDate.toISOString().split('T')[0];

    // Find existing bookings for the specified turf and date
    const existingBookings = await Booking.find({
      turfId: new mongoose.Types.ObjectId(turfId),
      date: isoDate
    });

    // Check if any of the selected slots are already booked
    const unavailableSlots = existingBookings.reduce((acc, booking) => {
      if (booking.slot1) acc.push("slot1");
      if (booking.slot2) acc.push("slot2");
      if (booking.slot3) acc.push("slot3");
      if (booking.slot4) acc.push("slot4");
      return acc;
    }, []);

    // Check if the requested slots are already booked
    if (
      (slot1 && unavailableSlots.includes("slot1")) ||
      (slot2 && unavailableSlots.includes("slot2")) ||
      (slot3 && unavailableSlots.includes("slot3")) ||
      (slot4 && unavailableSlots.includes("slot4"))
    ) {
      return res.status(400).json({ message: "One or more slots are already booked" });
    }

    // Create the new booking if slots are available
    const newBooking = new Booking({
      turfId: turfId,
      userId: userId,
      date: isoDate,
      slot1,
      slot2,
      slot3,
      slot4,
      name,
      phno
    });

    console.log("newBooking: ", newBooking);

    // Save the new booking
    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.get('/api/userbooking/:id', async (req, res) => {
  try {
      const venue = await Booking.find({userId : req.params.id});
      if (!venue) {
          return res.status(404).json({ message: "Venue not found" });
      }
      res.status(200).json(venue);
  } catch (err) {
      res.status(500).json({ message: "Error fetching venue data", error: err });
  }
});

app.get('/api/booking/:id', async (req, res) => {
  try {
      const bookingData = await Booking.findById(req.params.id);
      if (!bookingData) {
          return res.status(404).json({ message: "booking Data not found" });
      }
      console.log("VENUE : ",bookingData);
      res.status(200).json(bookingData);
  } catch (err) {
      res.status(500).json({ message: "Error fetching venue data", error: err });
  }
});

app.delete('/api/detelebooking/:id' , async(req,res)=>{
  try {
    const deleterecord = await Booking.findByIdAndDelete(req.params.id);

    console.log("DELETED RECORD : ",deleterecord);
    if (!deleterecord){
      res.status(404).json({message : 'Data not Found'});
    }
    res.status(201).json({message : 'Record Deleted Successfully'});
  }catch(e){
    console.log("Error" , e);
  }
})

const PORT = 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
});