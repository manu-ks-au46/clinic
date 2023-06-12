const { Router } = require("express");
const {
  getAllPatients,
  getPatientsByPhone,
  addPatient,
  deletePatient,
  updatePatient,
  getConsultationById,
  getPatientsByDoctor,
  updateAppointmentStatus,
  addConsultation,
  updateConsultation,
  deleteConsultation
} = require("../controllers/doctorController");
const {verifyToken,isDoctor} = require('../middlewares/usermiddleware')

const doctorRouter = new Router();

//get patients
doctorRouter.use(verifyToken)
doctorRouter.use(isDoctor)
doctorRouter.get("/",getAllPatients);
doctorRouter.get("/:mobileNumber", getPatientsByPhone);

//appointment

// doctorRouter.post("/apppointment",appointmentStatus)

//add,update,delete patients
doctorRouter.post("/addpatient", addPatient);
doctorRouter.put("/:patientId", updatePatient);
doctorRouter.delete("/delete/:id", deletePatient);
//add,update,delete patient prescription
doctorRouter.get("/patientinfo", getPatientsByDoctor);
doctorRouter.get("/consultation/:id", getConsultationById);
doctorRouter.post("/appointmentstatus", updateAppointmentStatus);
doctorRouter.post("/addconsultation", addConsultation);
doctorRouter.put("/:id", updateConsultation);
doctorRouter.delete("/:id", deleteConsultation);

module.exports = doctorRouter;
