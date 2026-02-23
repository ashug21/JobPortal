const express = require("express");
const router = express.Router();
const {fetchAllJobs , addJob , getSingleJob , applyForJob} = require("../controllers/job");
const verifyToken = require('../middleware/job');

router.post('/add' , verifyToken,  addJob);

router.get('/fetch' , fetchAllJobs);

router.get("/single/:id", getSingleJob);


router.post("/apply/:jobId", verifyToken, applyForJob);

module.exports = router;
