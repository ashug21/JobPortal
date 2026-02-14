const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/user");

const {
  createRecruiterProfile,
  getMyRecruiterProfile
} = require("../controllers/recruiter");

router.post("/", verifyToken, createRecruiterProfile);
router.get("/me", verifyToken, getMyRecruiterProfile);

module.exports = router;
