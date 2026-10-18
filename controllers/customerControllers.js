const Customer = require('../models/Customer')


const customerController = async (req, res) => {
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
}


module.exports = customerController