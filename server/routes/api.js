const express = require("express");
const router = express.Router()

const { register, isEmpIdExist, isEmaildExist } = require('../services/register')
const { login } = require('../services/login')
const { getAllUsers } = require('../services/users')

router.get('/', (req, res) => { res.send("Hello from api route....!!") })

router.post('/register', register)
router.post('/register/checkEmpId', isEmpIdExist)
router.post('/register/checkEmailId', isEmaildExist)
router.post('/login', login)
router.get('/getusers', getAllUsers)

module.exports = router