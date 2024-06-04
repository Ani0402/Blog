import express from 'express';
import Comment from "../models/Comment.js"
import verifyToken from '../middleware/verifyToken.js';

const router=express.Router();

router.post("/create",verifyToken,async(req, res) => {
    try{
       const newComment=new Comment(req.body)
       const savedComment=await newComment.save()
       return res.status(200).json({message:"Comment successfully created",savedComment})
    }
    catch(error){
        res.json({message:"Error creating Comment"})
        console.log("Error creating Comment",error)
    }
})

router.put('/update/:id',verifyToken,async(req, res) => {
    try{

      const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

      return res.status(200).json(updatedComment)
    }
    catch(error){
       res.json({message:"Error updating Comment"})
       console.log("Error updating Comment ",error)
    }
})

router.delete('/delete/:id',verifyToken,async(req, res) => {
   try{
      const comment=await Comment.findByIdAndDelete(req.params.id);
      
      if(!comment){
        return res.status(401).json({message:"Comment not found"})
      }
      
      return res.status(200).json({message:"Comment successfully deleted"})
   }
   catch(error){
    res.json({message:"Error deleting Comment"})
    console.log("Error deleting Comment ",error)
   }
})


router.get("/post/:postId",async(req, res) => {
    try{

        const comment=await Comment.find({postId:req.params.postId})

        if(!comment){
            return res.status(401).json({message:"Comments not found"})
        }
        return res.status(200).json({message:"User Comments successfully fetched",comment})
    }
    catch(error){
        res.json({message:"Error fetching user Comment"})
        console.log("Error fetching user Comments ",error)
    }
})

export default router;