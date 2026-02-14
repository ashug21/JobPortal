const pool = require("../lib/db");



const registerUser = async(req,res) => {
    
    try {
        
        const {email , password , role} = req.body;

        const existing = await pool.query("Select * from users where email = $1" , [email]);

        if(existing.rows.length > 0){
            return res.status(400).json({success : false , message : "User already exists"});
        }

        const result = await pool.query("insert into users (email , password , role) Values ($1 , $2 , $3) returning * ",[email , password , role]);

        return res.status(201).json({success : true , message : "user created successfully" , result});

    } catch (error) {
       return res.status(500).json({ message: "Server error" });
    }
}



const loginUser = async(req,res) => {

    try {
        
        const {email , password} = req.body;

        const result = await pool.query("Select * from users where email = $1" , [email]);

        if(result.rows.length === 0){
            return res.status(400).json({success : false , message : "User not found "});
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
          }

          res.json({ id: user.id, email: user.email, role: user.role});


    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {registerUser , loginUser};