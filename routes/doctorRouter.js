const { Router } = require("express");
const {
  getAllPatients,
  getPatientsByPhone,
  addPatient,
  deletePatient,
  updatePatient,
  getConsultation,
  addConsultation,
  updateConsultation,
  deleteConsultation
} = require("../controllers/doctorController");
const {verifyToken,isDoctor} = require('../middlewares/usermiddleware')

const doctorRouter = new Router();

//get patients
doctorRouter.use(verifyToken)
doctorRouter.use(isDoctor)
doctorRouter.get("/viewpatients",getAllPatients);
doctorRouter.get("/:mobileNumber", getPatientsByPhone);

//get patient prescription

//add,update,delete patients
doctorRouter.post("/addpatient", addPatient);
doctorRouter.put("/:patientId", updatePatient);
doctorRouter.delete("/delete/:id", deletePatient);
//add,update,delete patient prescription
doctorRouter.get("/:id", getConsultation);
doctorRouter.post("/consultation", addConsultation);
doctorRouter.put("/:id", updateConsultation);
doctorRouter.delete("/:id", deleteConsultation);

module.exports = doctorRouter;
