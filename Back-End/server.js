const dotenv = require('dotenv');
dotenv.config();
const {databaseErrorHandler} = require('./middlewares/errorMiddleware');

const express = require('express');
const db = require('./config/dbConfig');
const app = express();
const employeeRoute = require('./routes/employeeRoute');
const loginRoute = require("./routes/authRoute")
const servicesRoute = require("./routes/serviceRoute")
const customerRoute = require("./routes/customerRoute")
const orderRoute = require("./routes/orderRoute")
const vehicleRoute = require('./routes/vehicleRoute');
const session = require('express-session');

const port = process.env.PORT ;
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
app.use("/api/auth", loginRoute)

//services route
app.use("/api/services", servicesRoute);

//customer route
app.use("/api/customers", customerRoute)

//order route
app.use("/api/orders", orderRoute)

//vehicle route
app.use("/api/vehicle", vehicleRoute);


//database error handling middleware
app.use(databaseErrorHandler);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})