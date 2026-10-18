const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.send("Queue Management API is running.");
});

// Add your routes here

const PORT = process.env.PORT || 5000;

connectDB().then(()=>{
    app.listen(PORT,(req,res)=>{
      console.log(`server is listening on port ${PORT}`)
    })
}).catch((err)=>{
  console.log("DB didn't connect")
})