const { getDb } = require('../utils/database')
const { responseData } = require('../utils/responseHandler')

module.exports.login = async function (req, res) {
    try {
        let user = req.body
        const db = getDb()
        db.collection('users')
            .findOne({ email: user.email.toLowerCase() }, (error, euser) => {
                if (!euser) {
                    return responseData(res, false, 200, "Invalid Email")
                }
                if (euser && euser.password != user.password) {
                    return responseData(res, false, 200, "InValid Password")
                }
                else {
                    return responseData(res, true, 200, "user Found!", euser)
                }
            })
    }
    catch (error) {
        console.log("error : ", error);
        return responseData(res, false, 500);
    }
}