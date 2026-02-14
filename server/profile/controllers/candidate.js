const pool = require('../lib/db');


const createCandidateProfile = async (req,res) => {

    try {
        const userId = req.user.id;

        const {full_name , phone , location , skills , experience_years} = req.body;

        if(!full_name || !phone || !location || !skills || !experience_years){
            return res.status(400).json({success : false , message : "All fields are required"});
        }

        const existing = await pool.query("Select * from candidates where user_id = $1" , [userId]);

       
    if (existing.rows.length > 0) {
        return res.status(400).json({success: false, message: "Profile already exists"}); 
    }
  
        await pool.query("insert into candidates (full_name , phone , location, skills , experience_years) VALUES ($1 , $2 , $3 , $4 , $5 , $6) returning * ", [userId , full_name , phone , location , skills , experience_years]);


        return res.status(201).json({
            success: true,
            profile: result.rows[0]
          });
      

    } 
    catch (error) {
    
        console.log(error);
    
        return res.status(500).json({ success: false, message: "Server error" });
  }
}


const getMyCandidateProfile = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const result = await pool.query(
        "SELECT * FROM candidates WHERE user_id = $1",
        [userId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Profile not found"
        });
      }
  
      return res.json({
        success: true,
        profile: result.rows[0]
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  };

  
module.exports = {
  createCandidateProfile , getMyCandidateProfile
}