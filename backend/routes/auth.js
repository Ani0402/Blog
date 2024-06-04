import express from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config({
    path:".env"
})

const router=express.Router()

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(500).json({ message: "Please fill all fields" })
        }

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        await newUser.save()
        return res.status(200).json({ message: "User registered", newUser })
    }
    catch (error) {
        res.status(500).json({ message: "Error in registration" })
        console.log(error)
    }
})

router.post("/login",async(req, res) => {
  try{
    const {email,password}=req.body;

    if( !email || !password){
        return res.status(401).json({message:"please fill all fields"}) 
    }

    const user=await User.findOne({email:email});

    if(!user){
       return res.status(401).json({message:"User not registered"}) 
    }

    const match=await bcrypt.compare(password,user.password)

    if(!match){
        return res.status(401).json({message:"Incorrect Password"}) 
    }

    const payload={
        _id:user._id,
        username:user.username,
        email:user.email
    }
    const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1d"})

    const { password: userPassword, ...info } = user._doc;


    return  res.cookie("token",token).status(200).json(info)
  }
  catch(error){
     res.status(500).json({message:"error in login"})
    console.log("error in login ",error)
  }
})


router.get("/logout",async(req, res) => {
    try{
       return res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!") 
    }
    catch(error){
        res.status(500).json({message:"error in logout"})
        console.log("error in logout ",error)
    }
})

router.get("/refetch",(req, res) => {
   const token=req.cookies.token

   jwt.verify(token,process.env.SECRET_KEY,{},async(err,data)=>{
         if(err) res.status(400).json(err)
         return res.status(200).json(data)
   })
})

export default router;