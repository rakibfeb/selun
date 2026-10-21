const Customer = require('../models/Customer')
const bcrypt = require("bcrypt")


const register = async (req, res) => {
  const { customerName, phoneNumber, email, password } = req.body;

  if(!customerName || !phoneNumber || !password) {
    return res.send("Fill all the required field")
  }

  try {
    const isExists = await Customer.findOne({ phoneNumber });
    console.log(isExists)

    if (isExists) {
      res.status(500).send("Phone number exists");
    } else {
      const hashedPass = await bcrypt.hash(password,10)

      const user = new Customer({ customerName, phoneNumber, email, password:hashedPass,role:"customer" });
      await user.save();
      res.send("Costomer registered successfully!");
    }
  } catch (err) {
    res.status(500).send("something went wrong while creating customer");
  }
}


module.exports = {register}