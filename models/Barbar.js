const mongoose = require('mongoose');


const barbarSchema = new mongoose.Schema({
    barbar_name:{
        type:String,
        required:true
    },
    salonId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    services:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }],
    barber_status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
})

module.exports = mongoose.model("Barbar", barbarSchema)