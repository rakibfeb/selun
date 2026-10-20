const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const Customer = require("./models/Customer");
const {register} = require("./controllers/customerControllers")
const {salonRegister,getSalonList} = require("./controllers/salonControllers")
const {serviceRegister} = require ("./controllers/serviceControllers")
const {addQueue,removeQueue,getSalonQueue} = require("./controllers/queueControllers")
const cors = require("cors");



dotenv.config(); 


const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.send("Queue Management API is running.");
});

app.post("/register", register);
app.post("/salonRegister", salonRegister)
app.get("/salons",getSalonList)
app.post("/serviceRegister", serviceRegister)
app.post("/queue",addQueue)
app.get("/queue/:salonId",getSalonQueue)

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, (req, res) => {
      console.log(`server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB didn't connect");
  });
