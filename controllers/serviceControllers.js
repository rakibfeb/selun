const Service = require("../models/Service");
const Salon = require("../models/Salon");
const mongoose = require('mongoose')

const serviceRegister = async (req, res) => {
  const { salonId, serviceName, servicePrice, durationMin, isActive } = req.body;

  if (!mongoose.Types.ObjectId.isValid(salonId)) {
    return res.status(400).json({ message: "Invalid salonId" });
  }
  if (!serviceName || servicePrice == null || !durationMin) {
    return res.status(400).json({ message: "serviceName, servicePrice and durationMin are required" });
  }


  try {
    const isExists = await Salon.findById(salonId);
   
    if (!isExists) {
      return res.status(404).json({ message: "Salon does not exist" });
    } 

      const service = new Service({
        salonId,
        serviceName,
        servicePrice,
        durationMin,
        isActive,
      });
      await service.save();
      res.status(200).send("service registered successfully!");
    
  } catch (err) {
if (err.code === 11000) {
      return res.status(409).json({ message: "This service already exists for the salon" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: "Something went wrong while registering the service" });
  }  }

module.exports = { serviceRegister };
