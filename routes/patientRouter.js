const {Router} = require("express")
const {bookAppointment,signUpPatient,logInPatient,logOutPatient} =require('../controllers/patientController')
const {verifyToken} = require('../middlewares/usermiddleware')

const patientRouter = new Router()

patientRouter.post("/signup",signUpPatient)
patientRouter.post("/login",logInPatient)
patientRouter.post("/logout",logOutPatient)
patientRouter.use(verifyToken)
patientRouter.post("/bookappointment",bookAppointment)

module.exports = patientRouter