const router = require('express').Router()
const authController = require("./../controller/authController")

router
    .post('/register-admin', authController.registerAdmin)
    .post('/login-admin', authController.loginAdmin)
    .post('/logout-admin', authController.logoutAdmin)

    .post('/login-user', authController.loginUser)
    .post('/logout-user', authController.logoutUser)

module.exports = router