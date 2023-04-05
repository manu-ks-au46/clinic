const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require('cors')

const userRouter = require('./routes/userRoute')
const doctorRouter = require('./routes/doctorRoute')
const connectDB = require('./dbConfig')

dotenv.config()
const app = express()

//middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())//cookie

//routes
app.use('/doctors',userRouter)
app.use('/api/patients',doctorRouter)


PORT = process.env.PORT || 5000;
app.listen(PORT,(err)=>{
    if(!err){
        console.log(`server started and listening to port no : ${PORT}`)
        connectDB()
    }else{
        console.log(`server failed to start at port no : ${PORT}`);
    }
})