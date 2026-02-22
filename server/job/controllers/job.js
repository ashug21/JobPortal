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
    const jobs = await pool.query("SELECT * FROM job");

    return res.status(200).json({
      success: true,
      message: "Jobs Fetched Successfully",
      Jobs: jobs.rows,  
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Some error Occurred ${error.message}`,
    });
  }
};



const applyForJob = async (req , res) => {

  try {

    const candidate_id = req.user.id;
    const job_id = req.params.jobId;

    if(req.user.role === "recruiter"){
      return res.status(401).json({success : false , message : "Only a talent can apply for job"});
    }

    const existing = await pool.query(
      "Select * from applications where job_id = $1 and candidate_id = $2" , [job_id , candidate_id]
    );

    if(existing.rows.length > 0){
      return res.status(401).json({success : false , message : "Already applied to this job role"});
    }

    const result = await pool.query("Insert into applications(job_id , candidate_id) values ($1,$2) returning * ",[job_id , candidate_id]);

    return res.status(200).json({success : true , message : "Successfully applied" , application : result.rows[0]});

  } 
  
  catch (error) {
   return  res.status(500).json({ message: error.message });
  }
}


const getSingleJob = async (req,res) => {

    const {id} = req.params;

    try {

      const job = await pool.query("Select * from job where id = $1" , [id]);

      if(!job){
        return res.status(404).json({success : false , message : "Job does'nt exist"});
      }
  
      return res.status(201).json({success : true , message : "Job Found" , jobs : job.rows[0]});
      
    } catch (error) {
      
      return  res.status(500).json({ message: error.message });
    }
  
}


module.exports = {
  fetchAllJobs, addJob , getSingleJob
};
