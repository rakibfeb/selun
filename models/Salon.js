const mongoose = require('mongoose');

const salonSchema = new mongoose.Schema({
    salon_name:{
        type:String,
        required:true
    },
    salon_address:{
        type:String,
        required:true
    },
    salon_phoneNumber:{
        type:String,
        required:true
    },
    salon_email:{
        type:String,
        required:true
    },
    salon_password:{
        type:String,
        required:true
    },
    salon_status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },

})

module.exports = mongoose.model("Salon", salonSchema)