const pool = require("../lib/db");


const addJob = async (req, res) => {
    try {

        // const userId = req.user.id;

      const {
        title,
        description,
        company,
        location,
        job_type,
        work_mode,
        salary,
        experience_required,
        skills
      } = req.body;
  
      const result = await pool.query(
        `INSERT INTO job 
        (title, description, company, location, job_type, work_mode, salary, experience_required, skills) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *`,
        [title, description, company, location, job_type, work_mode, salary, experience_required, skills]
      );
  
      return res.status(201).json({
        success: true,
        message: "Job details added",
        job: result.rows[0]
      });
  
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  };
  

const fetchJobs = async(req,res) => {
    
    try {
        
        const result = await pool.query(`select * from job limit 10`);

        return res.status(200).json({success : true , jobs : result.rows});


    } catch (error) {
        console.log(error);
    
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports = {fetchJobs , addJob};