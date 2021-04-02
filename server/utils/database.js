const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (cb) => {
    MongoClient.connect('mongodb://localhost:27017/meanRLAUSS', { useUnifiedTopology: true })
        .then((client) => {
            _db = client.db();
            console.log('Connected to MongoDb');
            cb()
        }).catch((err) => {
            console.log(err);
        });
}

const getDb = () => {
    if (_db) return _db;
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;