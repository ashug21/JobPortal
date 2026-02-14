const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const candidateRoutes = require('./routes/candidate');
const recruiterRoutes = require('./routes/recruiter');
const cors = require("cors");

const PORT = process.env.PORT || 5101;


app.use(cors());
app.use(express.json());

app.use('/candidate' , candidateRoutes);
app.use('/recruiter' , recruiterRoutes);


app.get("/" , (req,res) => {
    res.send("Profile server up");
});


app.listen(PORT , () => console.log("profile server running"));