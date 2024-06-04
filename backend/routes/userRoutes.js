import express from 'express';
import User from "../models/User.js"
import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import bcrypt from "bcrypt"
import verifyToken from '../middleware/verifyToken.js';

const router=express.Router();

router.put('/update/:id',verifyToken,async(req, res) => {
    try{
      if(req.body.password){
        req.body.password =await bcrypt.hash(req.body.password,10)
      }

      const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

      return res.status(200).json(updatedUser)
    }
    catch(error){
       res.json({message:"Error updating"})
       console.log("Error updating ",error)
    }
})

router.delete('/delete/:id',verifyToken,async(req, res) => {
   try{
      const user=await User.findByIdAndDelete(req.params.id);
      
      if(!user){
        return res.status(401).json({message:"User not found"})
      }
      
      await Post.deleteMany({userId:req.params.id})

      await Comment.deleteMany({userId:req.params.id})

      return res.status(200).json({message:"User successfully deleted"})
   }
   catch(error){
    res.json({message:"Error deleting"})
    console.log("Error deleting ",error)
   }
})

router.get("/:id",async(req, res) => {
    try{

        const user=await User.findById(req.params.id).select("-password")
        if(!user){
            return res.status(401).json({message:"User not found"})
        }
        return res.status(200).json({message:"Users successfully fetched",user})
    }
    catch(error){
        res.json({message:"Error fetching user"})
        console.log("Error fetching user ",error)
    }
})

export default router;