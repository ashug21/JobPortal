const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const jobRoutes = require('./routes/job');

const PORT = process.env.PORT || 4201;


app.use(cors());
app.use(express.json());
app.use("/job" , jobRoutes);

app.get('/' , (req,res) => {
    res.send("Job server is up");
})

app.listen(PORT , () => console.log("Job server up"));
