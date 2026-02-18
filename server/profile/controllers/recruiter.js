const pool = require("../lib/db");



const createRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      company_name,
      company_website,
      company_location,
      company_description
    } = req.body;

    if (!company_name) {
      return res.status(400).json({
        success: false,
        message: "Company name is required"
      });
    }


    const existing = await pool.query(
      "SELECT * FROM recruiters WHERE user_id = $1",
      [userId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Recruiter profile already exists"
      });
    }

    const result = await pool.query(
      `INSERT INTO recruiters
      (user_id, company_name, company_website, company_location, company_description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [userId, company_name, company_website, company_location, company_description]
    );

    return res.status(201).json({
      success: true,
      profile: result.rows[0]
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



const getMyRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM recruiters WHERE user_id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found"
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
  createRecruiterProfile,
  getMyRecruiterProfile
};
