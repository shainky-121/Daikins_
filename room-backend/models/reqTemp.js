const mongoose = require("mongoose");

const requestedtemperature = new mongoose.Schema({
    reqtemperature:{
        type: Number,
        default: 25
    }
    });

module.exports = mongoose.model('ReqTemp', requestedtemperature);