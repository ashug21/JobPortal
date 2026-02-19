const express = require("express");
const router = express.Router();
const {registerTalent , loginTalent} = require('../controllers/talent')

router.post('/register' , registerTalent);

router.post('/login' , loginTalent);


module.exports = router;