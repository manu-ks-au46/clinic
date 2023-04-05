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
  address: {
    type: String,
    minLength: 1,
    maxLength: 100,
    required: true,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: Number,
    max: 10,
    required: true,
  },
  age: {
    type: Number,
    max: 120,
    required: true,
  },
  gender: {
    type: String,
    unique: true,
  },
},{timestamps:true});

const PatientModel = mongoose.model("patients", patientSchema);
module.exports = PatientModel;
