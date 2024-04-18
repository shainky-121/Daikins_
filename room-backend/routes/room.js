const express = require('express');
const router = express.Router();

const {getAllRooms} = require("../controllers/room");

router.route("/").get(getAllRooms);

module.exports = router;