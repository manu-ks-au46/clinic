const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require('cors')
// const helmet = require('helmet'); 

const userRouter = require('./routes/userRouter')
const patientRouter = require('./routes/patientRouter')
const doctorRouter = require('./routes/doctorRouter')
const superAdminRouter = require('./routes/superAdminRouter')
const connectDB = require('./dbConfig')

dotenv.config()
const app = express()

//middlewares
app.use(cors({
    allowedHeaders:'Authorization,Content-Type'
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())//cookie
// app.use(helmet());

//routes
app.use('/superadmin',superAdminRouter)
app.use('/doctors',userRouter)
app.use('/patients',doctorRouter)
app.use('/user',patientRouter)


PORT = process.env.PORT || 5000;
app.listen(PORT,(err)=>{
    if(!err){
        console.log(`server started and listening to port no : ${PORT}`)
        connectDB()
    }else{
        console.log(`server failed to start at port no : ${PORT}`);
    }
})