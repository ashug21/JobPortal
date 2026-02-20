const express = require("express");
const router = express.Router();
const {registerRecruiter, loginRecruiter} = require('../controllers/recruiter');
const verifyToken = require('../middleware/user');


router.post("/register" , registerRecruiter);

router.post("/login" , loginRecruiter);


router.post("/logout", (req, res) => {
    res.clearCookie("JobPortaltoken");
    res.json({ success: true, message: "Logged out successfully" });
  });
  

  router.get("/me", verifyToken, (req, res) => {
    res.json({
      success: true,
      user: req.user,
      role : req.user.role
    });
  });


module.exports = router;