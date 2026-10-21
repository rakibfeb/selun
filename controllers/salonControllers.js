const Salon = require('../models/Salon')
const bcrypt = require("bcrypt")


const salonRegister = async (req,res)=>{
    const {salonName,salonAddress,salonPhoneNumber,salonEmail,salonPassword}=req.body;

    if(!salonName || !salonPhoneNumber || !salonPassword) {
    return res.send("Fill all the required field")
  }

    try{
        const isExists = await Salon.findOne({salonPhoneNumber})
    if(isExists){
        res.status(500).send("number already exists!")
    }
    else{
         const hashedPass = await bcrypt.hash(salonPassword,10)
        const salon = new Salon ({salonName,salonAddress,salonPhoneNumber,salonEmail,salonPassword:hashedPass,role:"owner"})
        await salon.save();
        res.status(200).send("salon registered successfully!")
    }
    }catch(err){
        res.status(500).send(err.message)
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

const getSalon = (req,res)=>{
    res.send("get salon ")
}

const getOwnerProfile = (req, res) => {
  res.send("Owner profile data");
};

const updateSalonStatus = (req, res) => {
  res.send("Salon status updated");
};


module.exports = {salonRegister,getSalonList,getSalon,getOwnerProfile, updateSalonStatus}