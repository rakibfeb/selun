const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required:true   
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Customer", customerSchema)