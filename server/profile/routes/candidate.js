const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/user");
const {
  createCandidateProfile,
  getMyCandidateProfile
} = require("../controllers/candidate");

router.post("/", verifyToken, createCandidateProfile);
router.get("/me", verifyToken, getMyCandidateProfile);

module.exports = router;
