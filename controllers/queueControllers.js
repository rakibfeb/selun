const Salon = require("../models/Salon");
const Service = require("../models/Service");
const Customer = require("../models/Customer");
const Queue = require("../models/Queue");
const mongoose = require("mongoose");

const addQueue = async (req, res) => {

  const { salonId, customerId, walkInName, phoneNumber, queueStatus,sortKey , barberId} =
    req.body;
  // const serviceIds = req.body.serviceIds; // array of services id

  if (!mongoose.Types.ObjectId.isValid(salonId)) {
    return res.status(400).json({ message: "Invalid salonId" });
  }
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res.status(400).json({ message: "Invalid customerId" });
  }

try{
    const isExistsInQueue = await Queue.findOne({customerId})

    if(isExistsInQueue){
    return res.status(409).json({message:"Customer already exists in the Queue"})
  }
}catch(err){
    res.json({message:err.message})
}
  
  

  try {
    const person = new Queue({
      salonId,
      customerId,
      walkInName,
      phoneNumber,
      queueStatus,
      sortKey,
      barberId,
    });
    await person.save();
    res
      .status(201)
      .json({ message: "person added successfully inside the queue" });
  } 
  catch (err) {
      return res.status(501).json({ message: err.message });
    }
  
};

const removeQueue = (req, res) => {
  console.log("removed queue");
};

module.exports = { addQueue, removeQueue };
