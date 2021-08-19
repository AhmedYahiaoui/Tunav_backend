var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({

    hotel_booking :{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_booking :{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    room_no: {
        type: Number,
    },
    booking_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    arrival_date: {
        type: Date,
        required: true
    },
    departure_date: {
        type: Date,
        required: true
    },
    num_adults: {
        type: Number,
    },
    num_children: {
        type: Number,
    },

});

var Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;
