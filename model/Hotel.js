var mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;

var HotelSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        unique: false,
        required: true,
    },
    adress: {
        type: String,
        unique: false,
        required: true,
    },
    star: {
        type: Number,
        unique: false,
        required: true,
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
    },
    nbr_rooms: {
        type: Number,
        unique: false,
        required: true,
    },

    // LAT: {
    //     type: String,
    //     unique: false,
    //     required: true,
    // },
    // LNG: {
    //     type: String,
    //     unique: false,
    //     required: true,
    // },

    coordinates: {
        LAT: {
            type: String,
            unique: false,
            required: true,
        },
        LNG: {
            type: String,
            unique: false,
            required: true,
        }
    },


});



var Hotel = mongoose.model('Hotel', HotelSchema);
module.exports = Hotel;
