const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const JobRoutes = require('./routes/job');

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4201;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));



app.use(express.json());
app.use(cookieParser());

app.use('/jobs' , JobRoutes);

app.get('/' , (req , res) => {
    res.send("Job Server Up");
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));