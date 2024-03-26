const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const hotels = require ("./routes/hotels");
const bookings = require('./routes/bookings');
const auth = require('./routes/auth');
const reviews = require('./routes/reviews');
const otp = require('./routes/otp')
const cors = require('cors')
//Load env vars
dotenv.config({path:'./config/config.env'});
connectDB();


const app = express();
app.use(express.json()); // add body parser
app.use(cookieParser()); // add cookie parser
app.use(cors())
app.use('/api/v1/hotels', hotels); // add routes path files
app.use('/api/v1/bookings', bookings);
app.use('/api/v1/auth', auth);
app.use('/api/v1/review', reviews);
app.use('/api/v1/otp', otp);


const PORT=process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ', 
process.env.NODE_ENV,
 'on ' + process.env.HOST + ":" + PORT));

process.on('unhandledRejection', (err, promise) =>{
    console.log(`Error: ${err.message}`);
    server.close(()=> process.exit(1));
});
