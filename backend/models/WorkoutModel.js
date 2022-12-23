const mongoose = require('mongoose')

// The structure of our document:
const Schema = mongoose.Schema

const workoutSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required:true
    },
    // associating every workout to a user
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Workout', workoutSchema)

