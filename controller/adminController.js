const asyncHandler = require("express-async-handler")
const Team = require("../models/Team")

exports.getTeam = asyncHandler(async (req, res) => {
    const result = await Team.find()
    res.json({ message: "Team fetch successfully", result })
})

exports.addTeam = asyncHandler(async (req, res) => {
    const { name } = req.body
    
})