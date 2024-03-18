const dotenv = require('dotenv');
dotenv.config();
const {databaseErrorHandler} = require('./middlewares/errorMiddleware');

const express = require('express');
const db = require('./config/dbConfig');
const app = express();
const employeeRoute = require('./routes/employeeRoute');
const loginRoute = require("./routes/authRoute")
const session = require('express-session');

const port = process.env.PORT || 3000;
//middleware to parse the body of the request
app.use(express.json());

// middleware to handle session
app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === "production" ? true : false,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        httpOnly: true, // client-side js cannot access the cookie

    }
}));









//home route
app.get('/', (req, res) => {
    res.send('Hello World');
});

//employee route
app.use('/api/employee', employeeRoute);

//login route
app.use("/api/login", loginRoute)




//database error handling middleware
app.use(databaseErrorHandler);


// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`)
})