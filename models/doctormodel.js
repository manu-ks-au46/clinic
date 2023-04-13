const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const doctorSchema = new Schema({
  doctorName: {
    type: String,
    minLength: 1,
    maxLength: 25,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
  },
  specialization: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 25,
  },
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clinics'
  },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'patients'
    }
  ],
  isDoctor:{
    type:Boolean,
    default:false
  },
 
});

const DoctorModel = mongoose.model("doctors", doctorSchema);
module.exports = DoctorModel;
