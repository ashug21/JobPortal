const express = require("express");
const router = express.Router();
const {registerTalent , loginTalent , getTalentDetails} = require('../controllers/talent');
const verifyToken = require("../middleware/user");

router.post('/register' , registerTalent);

router.post('/login' , loginTalent);




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

  router.get('/talentDetails' , verifyToken ,getTalentDetails);


module.exports = router;