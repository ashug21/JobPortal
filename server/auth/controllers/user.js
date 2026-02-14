const pool = require("../lib/db");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      
        return res.status(400).json({success: false,message: "User already exists"});
    }

    const result = await pool.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [email, password, role]
    );

    return res.status(201).json({success: true,message: "User created successfully",user: result.rows[0]});

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password required"
        });
      }
  
      const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
  
      if (result.rows.length === 0) {
        return res.status(400).json({
          success: false,
          message: "User not found"
        });
      }
  
      const user = result.rows[0];
  
      if (user.password !== password) {
        return res.status(400).json({
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
  
      return res.json({
        success: true,
        token
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  

module.exports = { registerUser, loginUser };
