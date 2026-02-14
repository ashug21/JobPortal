const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const app = express();
const authRoutes = require('./routes/user');

const Port = process.env.PORT;



app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Auth Service API Working");
  });



app.listen(Port ,() => console.log(`server started at port ${Port}`));