const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const clinicSchema = new Schema({
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

  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
  },
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctors'
    }
  ],
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'patients'
    }
  ],
  isClinic:{
    type:Boolean,
    default:false
  },
  location: {
    type: String,
    minLength: 1,
    maxLength: 25,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },

},{timestamps:true});

const ClinicModel = mongoose.model("clinics", clinicSchema);
module.exports = ClinicModel;
