const express = require("express");
const router = express.Router()
const jwt = require('jsonwebtoken');
const { responseData } = require('../utils/responseHandler')
const { jwtSecretKey } = require('../config.json');
const { register, isEmpIdExist, isEmaildExist } = require('../services/register')
const { login } = require('../services/login')
const { getAllUsers } = require('../services/users')

router.get('/', (req, res) => { res.send("Hello from api route....!!") })

router.post('/login', login)
router.post('/register', register)
router.post('/register/checkEmpId', isEmpIdExist)
router.post('/register/checkEmailId', isEmaildExist)
router.get('/getusers', verifyToken, getAllUsers)

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return responseData(res, false, 401, 'Unauthorized request')
    }
    let token = req.headers.authorization.split(" ")[1]
    if (token === "null") {
        return responseData(res, false, 401, 'Unauthorized request')
    }
    let payload = jwt.verify(token, jwtSecretKey)
    if (!payload) {
        return responseData(res, false, 401, 'Unauthorized request')
    }
    req.userID = payload.subject
    next()
}

module.exports = router