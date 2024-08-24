const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    completeOn: {
        type: Date,
    },
    completeBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    }
}, { timestamps: true })

module.exports = mongoose.model('todo', TodoSchema)