const express = require("express");
const router = express.Router();
const {addJob , fetchJobs} = require('../controllers/job');

router.get('/joblist' , fetchJobs);

router.post('/addjobdetails' , addJob);


module.exports = router;