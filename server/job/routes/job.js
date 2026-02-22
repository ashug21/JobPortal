const express = require("express");
const router = express.Router();
const {fetchAllJobs , addJob , getSingleJob} = require("../controllers/job");
const verifyToken = require('../middleware/job');

router.post('/add' , verifyToken,  addJob);

router.get('/fetch' , fetchAllJobs);

router.get("/single/:id", getSingleJob);

module.exports = router;
