const room = require('../models/room');

const getAllRooms = async (req, res) =>{
const myData = await room.find();
res.status(200).json(myData);
}

module.exports = {getAllRooms};