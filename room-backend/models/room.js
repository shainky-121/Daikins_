const mongoose = require("mongoose");

//  const defTemp = Math.floor(Math.random() * 11) + 20 || Math.floor(Math.random() * 11) + 20;

const rommtemperature = new mongoose.Schema({
temperature:{
    type:Number,
    required: [true, "Temperature Must Not Be Zero"],
    default:Math.floor(Math.random() * (40 - 20 + 1)) + 20
},
name:{
    type:String,
    required: [true, "Name Must Not Be Enter"],
},
cooling:{
    type:Boolean,
    required: true,
},
Heating:{
    type:Boolean,
    required: true,
},

});

module.exports = mongoose.model('Room', rommtemperature);