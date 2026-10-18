const Salon = require("../models/Salon");
const Service = require("../models/Service");
const Customer = require("../models/Customer");
const Queue = require("../models/Queue");
const mongoose = require("mongoose");

const addQueue = async (req, res) => {

    const { salonId, customerId, walkInName, phoneNumber, queueStatus, sortKey, barberId } = req.body;
    const serviceIds = req.body.services; // array of services id
    console.log(serviceIds);
    let availableServices;

    try {
        const found = await Promise.all(serviceIds.map((id) => Service.findById(id)));
        availableServices = found.filter(Boolean);  // drop nulls for IDs that don't exist
    }catch(err){
        res.json(err.message)
    }


console.log(availableServices);

    const services = availableServices.map((s) => ({
        serviceId: s._id,
        serviceName: s.serviceName,
        durationMin: s.durationMin,
        servicePrice: s.servicePrice

    }))

    console.log(services)
    if (!mongoose.Types.ObjectId.isValid(salonId)) {
        return res.status(400).json({ message: "Invalid salonId" });
    }
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({ message: "Invalid customerId" });
    }

    try {
        const isExistsInQueue = await Queue.findOne({ customerId })

        if (isExistsInQueue) {
            return res.status(409).json({ message: "Customer already exists in the Queue" })
        }
    } catch (err) {
        res.json({ message: err.message })
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
            services
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
