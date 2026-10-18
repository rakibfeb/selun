const mongoose = require('mongoose');


const barbarSchema = new mongoose.Schema({
    barbarName:{
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
    barberStatus:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
})

module.exports = mongoose.model("Barbar", barbarSchema)