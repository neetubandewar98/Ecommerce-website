import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

//Register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: true, message: "Email already exist please login." });
    }
    //user register
    const hashedPassword  = await hashPassword(password)
    const user = await new userModel({name,email,password:hashedPassword}).save();
    res.status(201).send({
        success:true,
        message:"User Registered successfully!!",
        user
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//login controller
export const loginController = async (req, res)=>{
try {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(404).send({
            success:false,
            message:"Invalid Email and Password!!"
        })
    }

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).send({
            success:false,
            message:"Email not registered !!"
        })
    }
    const match = await comparePassword(password,user.password);
    if(!match){
        return res.status(200).send({
            success:false,
            message:"Password is invalid"
        })
    }

    //token
    const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"10d"});
    res.status(200).send({
        success:true,
        message:"Login Successfully!!",
        user:{
            name:user.name,
            email:user.email
        },
        token
    })
} catch (error) {
    console.log(error);
    res.status(500).send({success:false,message:"error in Login",error})
}
}