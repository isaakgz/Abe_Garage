const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const db = require('./config/dbConfig');
const app = express();

const port = process.env.PORT || 3000;
//middleware to parse the body of the request
app.use(express.json());









//home route
app.get('/', (req, res) => {
    res.send('Hello World');
});





// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`)
})