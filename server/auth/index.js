require("dotenv").config();

const express = require("express");
const cors = require("cors");
const verifyToken = require("./middleware/user");

const authRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.use("/user", authRoutes);

app.get("/", (req, res) => {
  res.send("Auth Service API Working");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
