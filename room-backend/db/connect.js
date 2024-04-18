const mongoose = require('mongoose');
const { options } = require('../routes/room');


const connectDB = (uri) => {
return mongoose.connect(uri);
}

module.exports = connectDB;