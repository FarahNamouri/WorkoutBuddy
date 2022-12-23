const express = require("express");
const Workout = require("../models/WorkoutModel");
const router = express.Router();
const {
  getWorkout,
  getOneWorkout,
  postWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require('../middleware/requireAuth')
// require auth for all workout routes
router.use(requireAuth) // find the middleware function before the next functions, to protect them
// GET all workouts
router.get("/", getWorkout);

// GET a single workout
router.get("/:id", getOneWorkout);

// POST a new workout
router.post("/", postWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.put("/:id", updateWorkout);

module.exports = router;
