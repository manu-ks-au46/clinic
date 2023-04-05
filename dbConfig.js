const mongoose = require('mongoose')

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL,{dbName:'Clinic'})
        console.log("DB connection successfull")
    } catch (error) {
        console.log("Error connecting to DB");
        process.exit()
    }
}
module.exports = connectDB