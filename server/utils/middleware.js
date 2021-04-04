
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config.json');

module.exports = function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        console.log("here");
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(" ")[1]
    if (token === "null") {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verifyToken(token, jwtSecretKey)
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userID = payload.subject
    return next()
}

// module.exports = verifyToken()