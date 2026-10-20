const Salon = require('../models/Salon')


const salonRegister = async (req,res)=>{
    const {salonName,salonAddress,salonPhoneNumber,salonEmail,salonPassword}=req.body;

    try{
        const isExists = await Salon.findOne({salonPhoneNumber})
    if(isExists){
        res.status(500).send("number already exists!")
    }
    else{
        const salon = new Salon ({salonName,salonAddress,salonPhoneNumber,salonEmail,salonPassword})
        await salon.save();
        res.status(200).send("salon registered successfully!")
    }
    }catch(err){
        res.status(500).send("something went wrong while registering salon")
    }

}

const getSalonList = async (req,res)=>{
    try{
        const salonList = await Salon.find();
        res.json(salonList)
    }
    catch(err){
        res.json(err.message)
    }

}

module.exports = {salonRegister,getSalonList}