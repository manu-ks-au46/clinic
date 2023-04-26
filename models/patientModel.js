const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const patientSchema = new Schema({
  patientId: {
    type: String,
    minLength: 1,
    maxLength: 11,
    required: true,
  },
  patientName: {
    type: String,
    minLength: 1,
    maxLength: 25,
    required: true,
  },

  email: {
    type: String,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    max: 120,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
    minLength: 1,
    maxLength: 100,
    required: true,
  },
  pinCode: {
    type: Number,
    max: 120,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",  
  },
  doctorname:{
    type:String
  },
  clinic:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "clinics",  
  },
  clinicName:{
    type:String

  },
  consultation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'consultation'
    }
  ],
},{timestamps:true});
const PatientModel = mongoose.model("patients", patientSchema);
module.exports = PatientModel;
