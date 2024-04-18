const express = require('express');
const router = express.Router();

const {getReqTemp} = require("../controllers/reqTemp");

router.route("/").get(getReqTemp);

module.exports = router;