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
const { requireAuth, requireOwner, requireCustomer } = require("./middleware/auth");




const cors = require("cors");
dotenv.config(); 

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());
app.use(bodyParser.json());





app.get("/health", (req, res) => res.send("Queue Management API is running."));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/owner", requireAuth, requireOwner, require("./routes/ownerRoutes"));
app.use("/api", requireAuth, requireCustomer, require("./routes/customerRoutes"));

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
