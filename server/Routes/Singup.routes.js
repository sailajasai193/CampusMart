const express=require("express");
const router=express.Router();
const userModel=require("../Models/Signup");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const otpStore = require("../email/otpStore");
const { generateOtp } = require("../email/generateOtp");
const { sendOtpEmail } = require("../email/send_otp");


router.post("/register", async (req, res) => {
  try {

    const {name,email,password }=req.body;

    const existingUser=await userModel.findOne({email});

    if (existingUser) {
      return res.status(400).json({ message:"User already exists"});
    }

    const hashedPassword=await bcrypt.hash(password, 10);
    const otp=generateOtp();
    otpStore[email]={
      name,
      email,
      password: hashedPassword,
      otp,
      createdAt: Date.now()
    };
    await sendOtpEmail(email,otp);
    res.json({
      message:"OTP sent to email"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/verify-otp", async (req, res) => {
  try {
    const {email,otp}=req.body;

    const storedData=otpStore[email];

    if (!storedData) {
      return res.status(400).json({message:"OTP expired"});
    }

    if(storedData.otp!==otp) {
      return res.status(400).json({ message:"Invalid OTP"});
    }

    const newUser=new userModel({
      name:storedData.name,
      email:storedData.email,
      password:storedData.password
    });

    await newUser.save();
    delete otpStore[email];
    const token = jwt.sign(
      { userId: newUser._id ,name: newUser.name},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      message: "Registration successful",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message:"Server error"});
  }
});



// LOGIN API
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //console.log("Secret:", process.env.JWT_SECRET);
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User Doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        console.log("Request body:", req.body);
        
        const token=jwt.sign(
          { userId: user._id, name: user.name },process.env.JWT_SECRET ,{expiresIn:'1d'}
        )
        res.json({ message: "Login successful", token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports=router;