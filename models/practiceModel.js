const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const practiceSchema = new Schema({
  clinicName: {
    type: String,
    minLength: 1,
    maxLength: 25,
    required: true,
  },
  aliasName: {
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
    max: 10,
    required: true,
  },
 
},{timestamps:true});

const PracticeModel = mongoose.model("practice", practiceSchema);
module.exports = PracticeModel;
