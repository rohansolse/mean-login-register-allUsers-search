const { getDb } = require('../utils/database');
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config.json');
const { responseData } = require('../utils/responseHandler')

module.exports.register = async function (req, res) {
    try {
        let user = req.body
        user.activate = true
        const db = getDb();
        db.collection('users')
            .insertOne(user)
            .then((result) => {
                // console.log("result after insert :", result.ops);
                let payload = { subject: result.ops[0]._id }
                let token = jwt.sign(payload, jwtSecretKey)
                responseData(res, true, 200, "user registered successfully!!", { token })
            })
    }
    catch (error) {
        console.log("error : ", error);
        return responseData(res, false, 500);
    }
}

module.exports.isEmpIdExist = async function (req, res) {
    try {
        const db = getDb()
        var codeExists = await db.collection('users')
            .find({ employeeId: req.body.employeeId })
            .count()
        // console.log("codeExists : ", codeExists);
        if (codeExists > 0) {
            return responseData(res, true, 200, "success");
        }
        else {
            return responseData(res, false, 200, "failure");
        }
    }
    catch (err) {
        console.log("error : ", error);
        return responseData(res, false, 500);
    }
}

module.exports.isEmaildExist = async function (req, res) {
    try {
        const db = getDb()
        var codeExists = await db.collection('users')
            .find({ email: req.body.email })
            .count()
        // console.log("codeExists : ", codeExists);
        if (codeExists > 0) {
            return responseData(res, true, 200, "success");
        }
        else {
            return responseData(res, false, 200, "failure");
        }
    }
    catch (err) {
        console.log("error : ", error);
        return responseData(res, false, 500);
    }
}