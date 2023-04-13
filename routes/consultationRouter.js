const { Router } = require("express");
const {
  getAllPatients,
  getPatientsByPhone,
  addPatient,
  deletePatient,
  updatePatient,
  getPrescription,
  postPrescription,
  updatePrescription,
  deletePrescription
} = require("../controllers/doctorController");
const {verifyToken,isDoctor} = require('../middlewares/usermiddleware')

const doctorRouter = new Router();
//get patients
doctorRouter.use(verifyToken)
doctorRouter.use(isDoctor)
doctorRouter.get("/viewpatients",getAllPatients);
doctorRouter.get("/:mobileNumber", getPatientsByPhone);
//get patient prescription
doctorRouter.get("/:mobileNumber", getPrescription);
//add,update,delete patients
doctorRouter.post("/addpatient", addPatient);
doctorRouter.put("/:mobileNumber", updatePatient);
doctorRouter.delete("/:mobileNumber", deletePatient);
//add,update,delete patient prescription
doctorRouter.post("/Prescription", postPrescription);
doctorRouter.put("/:mobileNumber", updatePrescription);
doctorRouter.delete("/:mobileNumber", deletePrescription);

module.exports = doctorRouter;
