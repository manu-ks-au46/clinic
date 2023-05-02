const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const PatientModel = require("../models/patientModel");
const AppointmentModel = require("../models/appointmentModel");
const DoctorModel = require("../models/doctormodel");
const ClinicModel = require("../models/clinicModel");

const signUpPatient = async (req, res) => {
    const { patientName, password, email, mobileNumber, age, gender, address, pinCode, createdBySelf } =
      req.body;
    try {
      const isSignUpUser = await PatientModel.findOne({ mobileNumber });
      if (isSignUpUser) {
        res.status(400).send({ status: "error", msg: "user already exist" });
        return;
      }
      const protectedPassword = await bcrypt.hash(password, 10);
      const newData = await PatientModel.create({
        patientName,
        email,
        mobileNumber,
        protectedPassword,
        age,
        gender,
        address,
        pinCode,
        createdBySelf
      });
      res.status(201).send({ status:"success", msg:"patient created successfully", data: newData })
    } catch (error) {
      res.status(500).send({ status:"error", msg:"internal server error", error })
    }
  };
  
const logInPatient = async (req, res) => {
  const { patientMobileNumber, password } = req.body;
  try {
    const loggedInPatient = await PatientModel.findOne({ patientMobileNumber });
    if (!loggedInPatient) {
      res.staus(404).send({ status: "error", msg: "user not found" }, error);
      return;
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      loggedInPatient.password
    );
    if (!isPasswordMatch) {
      res
        .status(400)
        .send({ status: "error", msg: "password incorrect" }, error);
      return;
    }
    const userPayload = {
      mobileNumber,
      id: loggedInPatient.id,
      name: loggedInPatient.patientName,
    };
    //Generate the token
    const token = jwt.sign(userPayload, process.env.SECRET_KEY, {
      algorithm: "HS384",
      expiresIn: "1d",
    });
    res.cookie("jwt", token);
    res.send({ status: "success", msg: "User Logged in Successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error, msg: "Internal Server Error" });
  }
};
const logOutPatient = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send({ status: "success", msg: "Logged Out Successfully" });
};

const bookAppointment = async (req, res) => {
  const patientId = req.params;
  const { mobileNumber } = req.body;
  try {
    const existingPatient = await PatientModel.findOne({ mobileNumber });
    if (existingPatient) {
      const newAppointment = await AppointmentModel.create();
      res
        .status(201)
        .send(
          {
            status: "success",
            msg: "appointment created successfull and waiting for clinic or doctor to accept",
          },
          newAppointment
        );
    } else {
      res
        .status(404)
        .send(
          {
            status: "error",
            msg: "not a existing patient sign up to continue",
          },
          error
        );
    }
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", msg: "internal server error" }, error);
  }
};

module.exports = {
  bookAppointment,
  signUpPatient,
  logInPatient,
  logOutPatient,
};
