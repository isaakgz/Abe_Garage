const dotenv = require('dotenv');
dotenv.config();
const {databaseErrorHandler} = require('./middlewares/errorMiddleware');

const express = require('express');
const db = require('./config/dbConfig');
const app = express();
const employeeRoute = require('./routes/employeeRoute');

const port = process.env.PORT || 3000;
//middleware to parse the body of the request
app.use(express.json());









//home route
app.get('/', (req, res) => {
    res.send('Hello World');
});

//employee route
app.use('/api/employee', employeeRoute);




//database error handling middleware
app.use(databaseErrorHandler);


// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`)
})