const mongoose = require('mongoose');


const connectDB = async ()=>{
    try{
         await mongoose.connect(process.env.MONGO_URI)
         console.log("DB connected successfully!")

    }
    catch(err){
        console.log("something went wrong while connectting to DB");
        throw error("something went wrong while connectting to DB");
        
    }

}

module.exports = {connectDB}