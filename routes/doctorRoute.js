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


const doctorRouter = new Router();
//get patients
doctorRouter.get("/", getAllPatients);
doctorRouter.get("/:mobileNumber", getPatientsByPhone);
//get patient prescription
doctorRouter.get("/:mobileNumber", getPrescription);
//add,update,delete patients
doctorRouter.post("/", addPatient);
doctorRouter.put("/:mobileNumber", updatePatient);
doctorRouter.delete("/:mobileNumber", deletePatient);
//add,update,delete patient prescription
doctorRouter.post("/Prescription", postPrescription);
doctorRouter.put("/:mobileNumber", updatePrescription);
doctorRouter.delete("/:mobileNumber", deletePrescription);

module.exports = doctorRouter;
