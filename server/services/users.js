const { getDb } = require('../utils/database')
const { responseData } = require('../utils/responseHandler')

module.exports.getAllUsers = async function (req, res) {
    try {
        const db = getDb()
        let tabledata = await db.collection('users')
            .aggregate([
                { $project: { _id: 0, activate: 0, password: 0 } },
                { $sort: { createdDate: 1 } },
            ]).toArray();
        // console.log("getAllUsers :", tabledata);
        if (tabledata.length > 0) {
            return responseData(res, true, 200, "success", tabledata);
        }
        else {
            return responseData(res, false, 200, "failure");
        }
    }
    catch (error) {
        console.log("error : ", error);
        return responseData(res, false, 500);
    }

}