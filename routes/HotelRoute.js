const express = require('express');
const Path =express.Router();
const authenticateJWT = require('../middleware/auth');
var dateFormat = require('dateformat');
var bodyParser = require('body-parser');
const Hotel  = require('../model/Hotel');


Path.use(bodyParser.json());
Path.use(bodyParser.urlencoded());
Path.use(bodyParser.urlencoded({ extended: true }));


// ********************    CRUD   ******************

// Add new Hotel
// If you wanna protect your request add ' authenticateJWT '
// Exemple get('/:id',authenticateJWT,async ..

Path.post('/AddHotel', async (req, res) => {
    let hotel = new Hotel({

        title : req.body.title,
        description: req.body.description,
        adress: req.body.adress,
        star: req.body.star,
        phone: req.body.phone,
        nbr_rooms: req.body.nbr_rooms,
        coordinates : {
            LAT: req.body.LAT,
            LNG: req.body.LNG
        }

    });
    try {
        await hotel.save();
        hotels = await Hotel.find();

        res.json({status: "ok", message: 'Hotel added' , data:hotels});
    } catch (err) {
        res.json({message: err.message});
    }
});


// All Reservations
Path.get('/hotels',async (req,res) => {
    // reservation = await Reservation.findOne({ _id : req.params.id});

    hotels = await Hotel.find();

    if(!hotels)
    {
        console.log("Mafameech hotels");
        return res.status(400).json({err:"not exist"});
    }
    else
    {
        console.log(" hotels");
        return res.json(hotels);
    }
});

// Find Hotel by ID
Path.get('/:id',async (req,res) => {
    hotel = await Hotel.findOne({ _id : req.params.id});
    if(!hotel)
    {
        console.log("Mafameech hotel");
        return res.status(400).json({err:"not exist"});
    }
    else
    {
        console.log('hotel`s name is :  ',hotel.title);
        return res.json(hotel);
    }
});


module.exports=Path;

