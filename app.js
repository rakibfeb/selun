const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const Customer = require("./models/Customer");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.send("Queue Management API is running.");
});

app.post("/customer", async (req, res) => {
  const { customerName, phoneNumber, email, password } = req.body;
  try {
    const isExists = await Customer.findOne({ phoneNumber });
    console.log(isExists)

    if (isExists) {
      res.status(500).send("Phone number exists");
    } else {
      const user = new Customer({ customerName, phoneNumber, email, password });
      await user.save();
      res.send("Costomer registered successfully!");
    }
  } catch (err) {
    res.status(500).send("something went wrong while creating customer");
  }
});

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
