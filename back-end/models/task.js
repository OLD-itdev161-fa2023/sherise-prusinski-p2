const mongoose = require("mongoose") // requiring the mongoose package

const taskSchema = new mongoose.Schema({
    // creating a schema for task
    /*user: {
        type: 'ObjectId',
        ref: 'User'
    },*/
    taskDescription: {
        // field1: task
        type: String, // task is a string
        unique: true, // it has to be unique
        required: true, // it is required
    },
    completed: {
        // field2: completed
        type: Boolean, // it is a boolean
        default: false, // the default is false
    }
})

const taskModel = mongoose.model("task", taskSchema) // creating the model from the schema

module.exports = taskModel // exporting the model