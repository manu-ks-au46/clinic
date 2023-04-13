const ClinicModel = require("../models/clinicModel");

const getClinicByMail = async(req, res) => {
    const {email} =req.params
  try {
    const clinics = await ClinicModel.findOne({ email: email })
    res.status(200).send({status : 'success',clinics})
  } catch (error) {
    res.status(404).send({status : 'error',msg:'clinic not found',error})
  }
};


const addClinic = async (req, res) => {
    const clinicData = req.body;
    const email = clinicData.email;
  
    try {
      let clinic = await ClinicModel.findOne({ email });
      if (clinic) {
        res.status(400).send({ status: "error", msg: "Clinic already exists" });
        return;
      }
  
      clinic = await ClinicModel.create(clinicData);
      res.status(201).send({
        status: "success",
        msg: "Clinic added successfully to Database",
        clinic,
      });
    } catch (error) {
      res.status(500).send({ status: "error", msg: "Error adding clinic", error });
    }
  };
  
  
module.exports = {
  addClinic,
  getClinicByMail,
};
