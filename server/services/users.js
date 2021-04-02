const { getDb } = require('../utils/database')
const { responseData } = require('../utils/responseHandler')

module.exports.getAllUsers = async function (req, res) {
    try { }
    catch (error) {
        console.log("error : ", error);
        return responseData(res, false, 500);
    }

}