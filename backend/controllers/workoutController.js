const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// To get all workouts:
const getWorkout = async(req, res) => {
    const user_id = req.user._id
    // creeatedAt: -1 we will sort them, the newest one will be on top
    const workout = await Workout.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(workout)
}

// To get a single workout:
const getOneWorkout = async(req, res) => {
    const {id} = req.params
    // it sees if the object (id) is not valid:
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

// Create a new workout:
const postWorkout = async (req,res) => {
    const {title, load, reps} = req.body
    // detect which fields are empty when we send a post request and send that information back to the client
    let emptyFields = []
    // if the title is empty:
    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // add doc to db :
    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a workout:
const deleteWorkout = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findByIdAndDelete({_id : id})
    if (!workout) {
        res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}


//Update a workout:
const updateWorkout = async(req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    })
    if (!workout) {
        res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}



module.exports= {
    getWorkout, getOneWorkout, postWorkout, deleteWorkout, updateWorkout
}