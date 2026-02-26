const express = require("express");
const router = express.Router();
const verfifyToken = require('../middleware/user');
const {candidateProfile} = require('../controllers/Candidate');



router.post('/talentProfile' , verfifyToken , candidateProfile);

module.exports = router;