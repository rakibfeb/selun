const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const Salon = require("../models/Salon");
const { signToken } = require("../utils/token");

const login = async (req, res) => {
  const { phone, password } = req.body;

  // typeof check stops injection like { "phone": { "$ne": "" } }
  if (typeof phone !== "string" || typeof password !== "string" || !phone || !password) {
    return res.status(400).json({ message: "Mobile number and password are required." });
  }

  try {
    const number = phone.trim();

    // 1. customer?
    const customer = await Customer.findOne({ phoneNumber: number }).select("+password");
    if (customer && (await bcrypt.compare(password, customer.password))) {
      return res.status(200).json({ token: signToken(customer._id, "customer"), role: "customer" });
    }

    // 2. salon owner?
    const salon = await Salon.findOne({ salonPhoneNumber: number }).select("+salonPassword");
    if (salon && (await bcrypt.compare(password, salon.salonPassword))) {
      return res.status(200).json({ token: signToken(salon._id, "owner"), role: "owner" });
    }

    // same message for unknown number and wrong password
    return res.status(401).json({ message: "Wrong mobile number or password." });
  } catch (err) {
    console.error(err);
    return res.status(500).json( err.message);
  }
};

module.exports = { login };