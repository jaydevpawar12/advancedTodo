const mongoose = require("mongoose")
const express = require("express")
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:5173"
}))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource not found" })
})
app.use((error, req, res, next) => {
    console.log(error);

    res.status(500).json({ message: "Server Error", error })
})
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT) || 5000, console.log("SERVER RUNNING");

})