const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HotelRoute = require('./routes/HotelRoute');
const ReservationRoute = require('./routes/ReservationRoute');
const UserRoute = require('./routes/UserRoute');

var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

app.use('/api/hotel', HotelRoute);
app.use('/api/reservation', ReservationRoute);
app.use('/api/user', UserRoute);

app.use( express.static( "config" ) );

mongoose.connect('mongodb://127.0.0.1:27017/TUNAV_DB',
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () =>
        console.log('DataBase is connected ')
);


// Localhost : 0.0.0.0
// app.listen(3000,'0.0.0.0');

// ipconfig : 192.168.1.25
app.listen(3000,'192.168.1.25');



module.exports = app;