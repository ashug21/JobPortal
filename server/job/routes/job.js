const express = require("express");
const router = express.Router();
const {fetchAllJobs , addJob} = require("../controllers/job");
const verifyToken = require('../middleware/job');

router.post('/add' , verifyToken,  addJob);

router.get('/fetch' , fetchAllJobs);

module.exports = router;
