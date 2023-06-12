const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const DoctorModel = require("../models/doctormodel");
const ClinicModel = require("../models/clinicModel");
const SECRET_KEY = process.env.SECRET_KEY;


const signUp = async (req, res) => {
  const userData = req.body;
  const { password } = req.body;
  try {
    loggedInUser = await DoctorModel.findOne({ email: userData.email });
    if (loggedInUser) {
      res.status(400).send({ status: "error", msg: "user already exist" });
      return;
    }
    const protectedPassword = await bcrypt.hash(password, 10);
    const newUser = await DoctorModel.create({
      ...userData,
      password: protectedPassword,
    });
    res.status(200).send({
      status: "success",
      msg: "user registred succesfully",
      user: {
        doctorName: newUser.doctorName,
        email: newUser.email,
        mobileNumber: newUser.mobileNumber,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", msg: "internal server error", error });
  }
};

// const clinicLogin =async(req,res)=>{
//   const {email,password} = req.body
//   try {
//     const loggedInClinic = await ClinicModel.findOne({email},{email:1,isClinic:1,password:1})
//     if(!loggedInClinic){
//       res.status(404).send({status:"error",msg:"clinic not found"})
//       return
//     }else{

//     }

//   } catch (error) {
    
//   }
// }

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loggedInUser = await DoctorModel.findOne(
      { email },
      { email: 1, password: 1, isDoctor: 1, doctorName: 1, clinic: 1 }
    );
    if (!loggedInUser) {
      res.status(404).send({ status: "error", msg: "User not found" });
      return;
    } else {
      const isPasswordMatch = await bcrypt.compare(
        password,
        loggedInUser.password
      );
      if (!isPasswordMatch) {
        res.status(400).send({ status: "error", msg: "Password Incorrect" });
        return;
      }
    }

    const userPayload = {
      email,
      isDoctor: loggedInUser.isDoctor,
      id: loggedInUser._id,
      doctorName: loggedInUser.doctorName,
      clinic: loggedInUser.clinic
    };

    //Generate the token
    const token = jwt.sign(userPayload, process.env.SECRET_KEY, {
      algorithm: "HS384",
      expiresIn: "1d",
    });
    res.cookie("jwt", token);
    res.send({ status: "success", msg: "User Logged in Successfully" },token);
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
  signUp,
  SECRET_KEY,
};
