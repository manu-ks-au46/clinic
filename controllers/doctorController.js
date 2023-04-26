const PatientModel = require("../models/patientModel");
const ConsultationModel = require("../models/consultationModel");
const DoctorModel = require("../models/doctormodel");
// const twilio = require('twilio');
const ClinicModel = require("../models/clinicModel");
// const accountSid = 'AC9778e26a084699b0dee0499d3186a2d3';
// const authToken = '09b4699624cadb4325512518b5ac66a6';
// const client = twilio(accountSid, authToken);

//patients

const getAllPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find()
      .populate("createdBy", "clinic")
      .exec();
    res.status(200).send({ status: "success", patients });
  } catch (error) {
    res.status(404).send({ status: "error", error });
  }
};

const getPatientsByPhone = async (req, res) => {
  const { mobileNumber } = req.params;

  try {
    const patient = await PatientModel.findOne({ mobileNumber: mobileNumber })
      .populate("createdBy", "clinicName")
      .exec();
    if (patient) {
      res.status(200).send({ status: "success", patient });
    } else {
      res.status(404).send({ status: "error", msg: "patient not found" });
    }
  } catch (error) {
    res.status(404).send({ status: "error", patient, error });
  }
};
const getPatientsByClinic = async (req, res) => {
  const { mobileNumber } = req.params;

  try {
    const patient = await PatientModel.findOne({ mobileNumber: mobileNumber })
      .populate("createdBy", "clinicName location", "ddoctorName")
      .exec();
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
    const existingUser = await PatientModel.findOne({
      patientId: patientData.patientId,
    });
    if (existingUser) {
      res
        .status(400)
        .send({ status: "error", msg: "user already exist with this ID" });
      return;
    }
    const doctorID = req.userPayload.id;
    const doctorName = req.userPayload.doctorName;
    const clinicID = req.userPayload.clinic
    const addedClinic = await ClinicModel.findById(clinicID)
    const clinicName =addedClinic.clinicName
    console.log(clinicName);

    // console.log(req.userPayload);
    
    const data = await PatientModel.create({
      ...patientData,
      createdBy: doctorID,
      doctorname: doctorName,
      clinicName:clinicName,
      clinic:clinicID
    });

    // const patientPhoneNumber = patientData.mobileNumber;
    // console.log(patientPhoneNumber);
    // const message = `Hello ${patientData.patientName}, your patient record has been created by Dr. ${doctorName} at ${clinicID}.`;

    // client.messages
    //   .create({
    //     body: message,
    //     from: 'whatsapp:+14155238886', // Twilio sandbox WhatsApp number
    //     to: `whatsapp:${patientPhoneNumber}`,
    //   })
    //   .then((message) => console.log(message.sid));

    const updatedDoctor = await DoctorModel.findByIdAndUpdate(doctorID, {
      $push: {
        patients: data._id,
      },
    });
    const updatedClinic = await ClinicModel.findByIdAndUpdate(clinicID,{
      $push:{
        patients:data._id
      },
    });
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
  const patientId = req.params.id;
  const patientData = req.body;
  try {
    const updatedPatient = await PatientModel.findByIdAndUpdate(patientId, patientData, {
      new: true, // Return the updated document
    });

    // Update the patient in the doctor schema
    const updatedDoctor = await DoctorModel.findOneAndUpdate({
      patients: patientId,
    }, {
      $set: {
        'patients.$': updatedPatient,
      },
    });

    // Update the patient in the clinic schema
    const updatedClinic = await ClinicModel.findOneAndUpdate({
      patients: patientId,
    }, {
      $set: {
        'patients.$': updatedPatient,
      },
    });

    res.status(200).send({
      status: "success",
      msg: "patient updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      msg: "error updating patient",
      error,
    });
  }
};
//delete 

const deletePatient = async (req, res) => {
  const patientId = req.params.id;
  console.log(req.params);
  console.log(patientId);
  try {
    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      res.status(404).send({
        status: "error",
        msg: "patient not found",
      });
      return;
    }
    const doctor = await DoctorModel.findById(patient.createdBy);
    if (!doctor) {
      res.status(404).send({
        status: "error",
        msg: "doctor not found",
      });
      return;
    }
    const clinic = await ClinicModel.findById(patient.clinic);
    if (!clinic) {
      res.status(404).send({
        status: "error",
        msg: "clinic not found",
      });
      return;
    }
    await doctor.updateOne({
      $pull: {
        patients: patientId,
      },
    });
    await clinic.updateOne({
      $pull: {
        patients: patientId,
      },
    });
    await PatientModel.findByIdAndDelete(patientId);
    res.status(200).send({
      status: "success",
      msg: "patient deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      msg: "error deleting patient",
      error,
    });
  }
};

//consultation
const getConsultation = async (req, res) => {
  const { consultationId } = req.params;

  try {
    const getConsultation = await ConsultationModel.findById(consultationId)
      .populate("createdBy", "name _id")
      .populate("createdByDoctor", "name _id");

    res.status(200).json({
      status: "success",
      msg: "consultation retrieved successfully",
      consultation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "error retrieving consultation",
      error,
    });
  }
};


const addConsultation = async (req, res) => {
  const { patientId, disease, numberOfVisit, nextConsultationDate, attachment, description } = req.body;

  try {
    const consultation = await ConsultationModel.create({
      patientId,
      mobileNumber: req.body.mobileNumber,
      disease,
      numberOfVisit,
      nextConsultationDate,
      attachment,
      description,
      createdBy: req.userPayload.clinic,
      createdByDoctor: req.userPayload.doctor,
      doctorName: req.userPayload.doctorName,
      clinicName: req.userPayload.clinicName,
    });

    const patient = await PatientModel.findByIdAndUpdate(patientId, {
      $push: {
        consultation: consultation._id,
      },
    });

    res.status(201).json({
      status: "success",
      msg: "consultation added successfully to patient",
      consultation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "error adding consultation to patient",
      error,
    });
  }
};


const updateConsultation = async (req, res) => {
  const { consultationId, disease, numberOfVisit, nextConsultationDate, attachment, description } = req.body;

  try {
    const consultation = await ConsultationModel.findByIdAndUpdate(consultationId, {
      disease,
      numberOfVisit,
      nextConsultationDate,
      attachment,
      description,
    });

    await PatientModel.updateOne(
      { consultation: consultationId },
      {
        $set: {
          "consultation.$.disease": disease,
          "consultation.$.numberOfVisit": numberOfVisit,
          "consultation.$.nextConsultationDate": nextConsultationDate,
          "consultation.$.attachment": attachment,
          "consultation.$.description": description
        }
      }
    );

    res.status(200).json({
      status: "success",
      msg: "consultation updated successfully",
      consultation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "error updating consultation",
      error,
    });
  }
};


const deleteConsultation = async (req, res) => {
  const { consultationId } = req.params;

  try {
    const consultation = await ConsultationModel.findByIdAndDelete(consultationId);

    if (!consultation) {
      return res.status(404).json({
        status: "error",
        msg: "consultation not found",
      });
    }

    const patient = await PatientModel.findByIdAndUpdate(consultation.patientId, {
      $pull: {
        consultation: consultation._id,
      },
    });

    res.status(200).json({
      status: "success",
      msg: "consultation deleted successfully",
      consultation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "error deleting consultation",
      error,
    });
  }
};


module.exports = {
  getAllPatients,
  getPatientsByPhone,
  getPatientsByClinic,
  addPatient,
  updatePatient,
  deletePatient,
  getConsultation,
  addConsultation,
  updateConsultation,
  deleteConsultation,
};
