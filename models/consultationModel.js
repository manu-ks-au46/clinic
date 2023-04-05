const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const consultationSchema = new Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients",
    },
    mobileNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients",
    },

    consultationDate: {
      type: Date,
      default: Date.now(),
    },
    disease: {
      type: String,
    },
    numberOfVisit: {
      type: Number,
    },
    nextConsultationDate: {
      type: Date,
    },
    attachment: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
    },
  },
  {
    timestamps: true,
  }
);

const ConsultationModel = mongoose.model("consultation", consultationSchema);
module.exports = ConsultationModel;
