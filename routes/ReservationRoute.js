const express = require('express');
const Path =express.Router();
const authenticateJWT = require('../middleware/auth');
var dateFormat = require('dateformat');
var bodyParser = require('body-parser');
const Reservation  = require('../model/Reservation');


Path.use(bodyParser.json());
Path.use(bodyParser.urlencoded());
Path.use(bodyParser.urlencoded({ extended: true }));



// ********************    CRUD   ******************


// Add new Reservation
// If you wanna protect your request add ' authenticateJWT '
// Exemple get('/:id',authenticateJWT,async ..

Path.post('/AddReservation', authenticateJWT,async (req, res) => {

    let reservation = new Reservation({
        hotel_booking : req.body.hotel_booking,
        user_booking : req.id,
        room_no: req.body.room_no,
        booking_date: Date.now(),
        arrival_date: req.body.arrival_date,
        departure_date: req.body.departure_date,
        num_children: req.body.num_children
    });
    console.log(req.id);
    try {
        await reservation.save();
        res.json({status: "ok", message: 'Reservation added'});
    } catch (err) {
        res.json({message: err.message});
    }
});



// Find Reservation by ID
Path.get('/detail',authenticateJWT,async (req,res) => {
    // reservation = await Reservation.findOne({ _id : req.params.id});

    reservation = await Reservation.findOne({
        hotel_booking : req.body.hotel_booking,
        user_booking : req.body.user_booking
    });

    if(!reservation)
    {
        console.log("Mafameech reservation");
        return res.status(400).json({err:"not exist"});
    }
    else
    {
        console.log('Reservation user',reservation.user_booking,' Reservation user',reservation.hotel_booking);
        return res.json(reservation);
    }
});



module.exports=Path;
