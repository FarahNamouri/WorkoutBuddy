const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const cors = require('cors')
var MONGO_URI =
  "mongodb+srv://FarahNamouri:FARAH09072021@learning-mongodb.zin5s2q.mongodb.net/?retryWrites=true&w=majority";

// Cretaes an express app stored in app
const app = express();

// middleware
app.use(express.json());
app.use(cors('*'))
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes: grabs all the routes from workouts.js and uses them on the app
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Connect to DB:
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
   app.listen(3000, console.log("Connected to database and listening on port 3000"));
  })
  .catch((error) => console.log("Error occured in the Database", error));
