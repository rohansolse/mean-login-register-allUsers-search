const { getDb } = require('../utils/database');
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config.json')
const { responseData } = require('../utils/responseHandler')

var CryptoJS = require("crypto-js");
module.exports.login = async function (req, res) {
    try {
        let user = req.body
        const db = getDb()
        db.collection('users')
            .findOne({ email: user.email.toLowerCase() }, async (error, euser) => {
                if (!euser) {
                    return responseData(res, false, 200, "Invalid Email")
                }
                if (await getDecreption(user.password) != await getDecreption(euser.password)) {
                    return responseData(res, false, 200, "InValid Password")
                }
                else {
                    // console.log(euser);
                    let payload = { subject: euser._id }
                    let token = jwt.sign(payload, jwtSecretKey)
                    return responseData(res, true, 200, "user Found!", { token })
                }
            })
    }
    catch (error) {
        console.log("error : ", error);
        return responseData(res, false, 500);
    }
}

function getDecreption(textToConvert) {
    return CryptoJS.AES.decrypt(textToConvert.trim(), "thisIsMyLearningProject".trim()).toString(CryptoJS.enc.Utf8);
}