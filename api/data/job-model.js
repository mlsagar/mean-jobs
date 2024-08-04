const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    location: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postal: {
            type: Number,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    postedDate: {
        type: Date,
        default: new Date
    }
})

mongoose.model("Job", jobSchema, "jobs");