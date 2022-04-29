const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

//  storing the db string into a variable called mongoString
const mongoString = process.env.DATABASE_URL

// connecting the database to our server using Mongoose

mongoose.connect(mongoString);
const database = mongoose.connection
// throwing a success or an error message depending on whether our database connection is successful or fails

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
// database.on means it will connect to the database, and throws any error if the connection fails. 
// And database.once means it will run only one time. If it is successful, it will show a message that says Database Connected.
const app = express();

app.use(express.json());
// Also, let's use this routes file.

const routes = require('./routes');

app.use('/api', routes)
app.get('/', (req, res) => {
    console.log(req);
    res.json("Hola Mundo")
})

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
