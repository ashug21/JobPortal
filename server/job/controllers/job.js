const pool = require("../lib/db");

const addJob = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if(req.user.role === "talent"){
      return res.status(401).json({message : "Talent can't post a Job"});
    }

    
    const recruiter_id = req.user.id;
    console.log(recruiter_id);
    
    const {
      title,
      description,
      company,
      location,
      jobtype,
      workmode,
      salary,
      experienceRequired,
      skills
    } = req.body;

    const newJob = await pool.query(
      `INSERT INTO job 
      (recruiter_id, title, description, company, location, jobtype, workmode, salary, experiencerequired, skills)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [
        recruiter_id,
        title,
        description,
        company,
        location,
        jobtype,
        workmode,
        salary,
        experienceRequired,
        skills
      ]
    );

    return res.status(201).json(newJob.rows[0]);

  } catch (error) {
    console.log("ADD JOB ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


// const addJob = async(req , res) => {

//   try {

//     const { recruiter_id, title, description, company, location, jobtype, workmode, salary, experienceRequired, skills} = req.body;

//     const newJob = await pool.query(
//             `INSERT INTO job 
//               (recruiter_id, title, description, company, location, jobtype, workmode, salary, experienceRequired, skills)
//               VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
//               RETURNING *`,
//             [ recruiter_id, title, description, company, location, jobtype,workmode, salary, experienceRequired,skills]
//           );

//           return res.status(201).json(newJob.rows[0]);
//         }

//           catch (error) {
//               return  res.status(500).json({ message: "Server error" });
//      } 
// }


const fetchAllJobs = async (req, res) => {
  try {
    const jobs = await pool.query("Select * from job");

    if (jobs.rows.length === 0) {
      return res.json({ success: true, message: "No Jobs Available" });
    }

    return res.json({
      success: true,
      message: "Job Fetched Successfully",
      Jobs: jobs.rows[0],
    });
  } catch (error) {
    return res.json({ success: false, message: `Some error Occured ${error}` });
  }
};

module.exports = {
  fetchAllJobs, addJob
};
