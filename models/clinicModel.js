const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const clinicSchema = new Schema({
  doctorName: {
    type: String,
    minLength: 1,
    maxLength: 25,
    required: true,
  },
  doctorId: {
    type: String,
    minLength: 1,
    maxLength: 25,
    required: true,
    unique: true,
  },
  clinicName: {
    type: String,
    minLength: 1,
    maxLength: 25,
    required: true,
  },
  clinicAliasName: {
    type: String,
    minLength: 1,
    maxLength: 25,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    minLength: 1,
    maxLength: 25,
    required: true,
  },
  isDoctor:{
    type:Boolean,
    default:false
  }

},{timestamps:true});

const ClinicModel = mongoose.model("clinic", clinicSchema);
module.exports = ClinicModel;
