const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    team: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'team'
            }
        ],
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('employee', employeeSchema)