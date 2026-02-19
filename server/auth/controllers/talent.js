const pool = require("../lib/db");
const jwt = require("jsonwebtoken");


const registerTalent = async (req, res) => {
  try {
    const { full_name, phone , email , password } = req.body;

    if (!full_name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await pool.query(
      "SELECT * FROM recruiters_table WHERE email = $1",
      [email]
    );

    const existing2 = await pool.query(
      "Select * From talent_table where email = $1", [email]
    );

    if (existing.rows.length > 0) {
      
        return res.status(400).json({success: false,message: "User already exists as Recruiter"});
    }

    if (existing2.rows.length > 0) {
      
      return res.status(400).json({success: false,message: "User already exists as Talent"});
  }

    const result = await pool.query(
      "INSERT INTO talent_table (full_name, phone , email , password , role) VALUES ($1, $2, $3 , $4 , $5) RETURNING *",
      [full_name, phone , email , password , "talent"]
    );

    return res.status(201).json({success: true,message: "Talent created successfully",talent: result.rows[0]});

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};



const loginTalent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const result = await pool.query(
      "SELECT * FROM talent_table WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


module.exports = { registerTalent, loginTalent };
