const mongoose = require('mongoose');

const salonSchema = new mongoose.Schema({
    salonName:{
        type:String,
        required:true
    },
    salonAddress:{
        type:String,
        required:true
    },
    salonPhoneNumber:{
        type:String,
        required:true
    },
    salonEmail:{
        type:String,
        required:true
    },
    salonPassword:{
        type:String,
        required:true
    },
    salonStatus:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },

})

module.exports = mongoose.model("Salon", salonSchema)