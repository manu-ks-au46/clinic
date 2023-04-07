const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ClinicModel = require("../models/clinicModel");

const signUp = async (req, res) => {
  const userData = req.body;
  const {password}=req.body
  try {
    loggedInUser = await ClinicModel.findOne({ email: userData.email });
    if (loggedInUser) {
      res.status(400).send({ status: "error", msg: "user already exist" });
      return;
    }
    const protectedPassword = await bcrypt.hash(password, 10);
    const newUser = await ClinicModel.create({ ...userData, password: protectedPassword });
    res.status(200).send({
      status: "success",
      msg: "user registred succesfully",
      user: {
        patientName: newUser.patientName,
        email: newUser.email,
        mobileNumber: newUser.mobileNumber,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "error", msg: "internal server error", error });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loggedInUser = await ClinicModel.findOne({ email: email },{email:1,password:1,isDoctor:1});
    if (!loggedInUser) {
      res.status(400).send({ status: "error", msg: "User not found" });
      return;
    } else {
      isPasswordMatch = await bcrypt.compare(password, loggedInUser.password); 
      if (!isPasswordMatch) {
        res.status(400).send({ status: "error", msg: "Password Incorrect" });
        return;
      }
    }
    const userPayload = { email, isDoctor: loggedInUser.isDoctor};
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

const logOut = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send({ status: "success", msg: "Logged Out Successfully" });
};

module.exports = {
  logIn,
  logOut,
  signUp
};
