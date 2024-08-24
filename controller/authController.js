const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/handleEmpty")
const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")
const Employee = require("../models/Employee")
const jwt = require("jsonwebtoken")



exports.registerAdmin = asyncHandler(async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)
    await Admin.create({ ...req.body, password: hash })
    res.json({ message: "success" })
})
exports.loginAdmin = asyncHandler(async (req, res) => {
    const { userName, password } = req.body
    const { isError, error } = checkEmpty({ userName, password })
    if (isError) {
        return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED", error })
    }
    const result = await Admin.findOne({
        $or: [
            { email: userName },
            { mobile: userName }
        ]
    })
    if (!result) {
        return res.status(401).json({ message: "Email / Mobile not found" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "Incorrect Password" })
    }
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "7d" })
    res.cookie("admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
    res.json({
        message: "Logged In Successfully",
        userId: result._id,
        email: result.email,
        mobile: result.mobile,
    })

})
exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie('admin')
    res.json({ message: "Admin Logged Out Successfully" })
})


exports.loginUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body
    const { isError, error } = checkEmpty({ userName, password })
    if (isError) {
        return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED", error })
    }
    const result = await Employee.findOne({
        $or: [
            { email: userName },
            { mobile: userName }
        ]
    })
    if (!result) {
        return res.status(401).json({ message: "Email / Mobile not found" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "Incorrect Password" })
    }
    const token = jwt.sign({ userId: result._id }, process.env.JET_KEY, { expiresIn: "7d" })
    res.cookie("employee", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
    res.json({
        message: "Logged In Successfully",
        userId: result._id,
        email: result.email,
        mobile: result.mobile,
    })
})
exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("employee")
    res.json({ message: "Employee Logged Out Successfully" })
})