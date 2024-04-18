const reqTemp = require('../models/reqTemp');

const getReqTemp = async (req, res) =>{
const myData = await reqTemp.find();
res.status(200).json(myData);
}

module.exports = {getReqTemp};