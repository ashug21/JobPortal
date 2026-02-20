require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const recruiterRoutes = require("./routes/recruiter");
const talentRoutes = require("./routes/talent");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.get('/' , (req,res) => {
  res.send("Auth server up");
})

app.use(express.json());
app.use(cookieParser());

app.use("/recruiter", recruiterRoutes);
app.use("/talent", talentRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
