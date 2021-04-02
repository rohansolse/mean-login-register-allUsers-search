const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const { mongoConnect } = require("./utils/database");
const port = 3000;
const app = express()
const api = require('./routes/api')
app.use(cors())

app.use(bodyParser.json())
app.use('/api/v1', api)

app.get('/', (req, res) => {
    res.send("Hello from the server")
})

mongoConnect(() => {
    app.listen(port, () => {
        console.log("server is lisning at  :", port);
    })
})
