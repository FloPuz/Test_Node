const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    label: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    dateTask: {
        type: Date,
        // required: true
    },
    status: {
        type: String,
        required: true,
        default: 'To Do'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Task', taskSchema);