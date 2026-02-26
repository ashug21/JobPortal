const pool = require('../lib/db');


const candidateProfile = async(req,res) => {

    try {
        const talentid = req.user.id;

    if(req.user.role === "recruiter"){
        return res.status(401).json({success : false , message : "Recruiter can't access talent's profile"});
    }

    const {age , gender , headline , bio , skills , experience , education ,  linkedin_url ,  github_url ,   portfolio_url , location , certification , language} = req.body;

    const result = await pool.query(`Insert into talent_profile (talent_id , age , gender , headline , bio , skills , experience , education ,  linkedin_url ,  github_url ,   portfolio_url , location , certification , language) 
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
        [talentid, age , gender , headline , bio , skills , experience , education ,  linkedin_url ,  github_url ,   portfolio_url , location , certification , language])    
   
   
       return res.status(201).json({
            success: true,
            message: "Profile Updated",
            profile: result.rows[0]
          });
    }
    
        catch (error) {
        
        return res.status(500).json({success : false , message : error.message });
    }
}

module.exports = {
    candidateProfile
}