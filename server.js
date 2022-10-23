// Sarah Sami - 101334588

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const empRoutes = require('./routes/emp')



const app = express()
const SERVER_PORT = 8081
const DB_CONNECTION_STRING = 'ENTER YOUR CONNECTION STRING HERE'


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/api/user", userRoutes)
app.use("/api/emp", empRoutes)


mongoose.Promise = global.Promise
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server")  
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit();
})


app.route("/")
    .get((req, res) => {
        res.send("<h1>Welcome to Assignment 1</h1>")
    })


app.listen(SERVER_PORT, () =>{
    console.log(`Server is listening on port http://localhost:${SERVER_PORT}/`)
})
