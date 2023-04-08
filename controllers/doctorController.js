const PatientModel = require("../models/patientModel");
const ConsultationModel = require("../models/consultationModel");



//patients

const getAllPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find().populate("createdBy", "clinicName location")
    .exec();
    res.status(200).send({ status: "success", patients });
  } catch (error) {
    res.status(404).send({ status: "error", error });
  }
};

const getPatientsByPhone = async (req, res) => {
  const { mobileNumber } = req.params;

  try {
    const patient = await PatientModel.findOne({ mobileNumber: mobileNumber }).populate("createdBy", "clinicName location")
    .exec();;
    if (patient) {
      res.status(200).send({ status: "success", patient });
    } else {
      res.status(404).send({ status: "error", msg: "patient not found" });
    }
  } catch (error) {
    res.status(404).send({ status: "error", patient, error });
  }
};

const addPatient = async (req, res) => {
  const patientData = req.body;
  try {
    const existingUser = await PatientModel.findOne({patientId:patientData.patientId});
    if (existingUser) {
      res.status(400).send({ status: "error", msg: "user already exist with this ID" });
    return
    }
    const clinicID = req.userPayload.id
    console.log(clinicID);
    const data = await PatientModel.create({...patientData,createdBy:clinicID});
    res.status(201).send({
      status: "success",
      msg: "patient added successfully to Database",
      patient: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      msg: "error adding patient to Database",
      error,
    });
  }
};
const updatePatient = async (req, res) => {
  const { mobileNumber } = req.params;
  const updatedPatientData = req.body;
  try {
    const updatedPatient = await PatientModel.findOneAndUpdate(
      mobileNumber,
      updatedPatientData
    );
    res.status(201).send({
      status: "success",
      msg: "patient updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", msg: "error updating patient", error });
  }
};

const deletePatient = async (req, res) => {
  const { mobileNumber } = req.params;
  try {
    const deletedPatient = await PatientModel.findOneAndDelete(mobileNumber);
    res.status(201).send({
      status: "success",
      msg: "patient deleted successfully",
      patient: deletedPatient,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      msg: "error deleting patient from database",
      error,
    });
  }
};
//consultation
const getPrescription = async(req, res) => {
  const {mobileNumber} =req.params
  try {
    const prescription = await ConsultationModel.findOne({ mobileNumber: mobileNumber });
    if (prescription) {
      res.status(200).send({ status: "success", prescription });
    } else {
      res.status(404).send({ status: "error", msg: "prescription not found"});
    }
  } catch (error) {
    res.status(404).send({ status: "error", prescription, error });
  }
};

const postPrescription = async(req, res) => {
  const prescriptionData = req.body
  try {
    const prescriptionAdd = await ConsultationModel.create(prescriptionData)
    res.status(201).send({
      status: "success",
      msg: "prescription added successfully to Database",
      prescription: prescriptionAdd,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      msg: "error adding prescription to Database",
      error,
    });
  }
};

const updatePrescription = async(req, res) => {
  const { mobileNumber } = req.params;
  const updatedConsultationData = req.body;
  try {
    const updatedPrescription = await ConsultationModel.findOneAndUpdate(
      mobileNumber,
      updatedConsultationData
    );
    res.status(201).send({
      status: "success",
      msg: "prescription updated successfully",
      prescription: updatedPrescription,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", msg: "error updating prescription", error });
  }
};

const deletePrescription = async(req, res) => {
  const { mobileNumber } = req.params;
  try {
    const deletedPrescription = await ConsultationModel.findOneAndDelete(mobileNumber);
    res.status(201).send({
      status: "success",
      msg: "prescription deleted successfully",
      prescription: deletedPrescription,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      msg: "error deleting Prescription from database",
      error,
    });
  }
};

module.exports = {
  getAllPatients,
  getPatientsByPhone,
  addPatient,
  updatePatient,
  deletePatient,
  getPrescription,
  postPrescription,
  updatePrescription,
  deletePrescription
};
