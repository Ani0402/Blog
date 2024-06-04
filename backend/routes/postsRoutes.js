import express from 'express';
import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import bcrypt from "bcrypt"
import verifyToken from '../middleware/verifyToken.js';

const router=express.Router();

router.post("/create",verifyToken,async(req, res) => {
    try{
       const newPost=new Post(req.body)
       const savedPost=await newPost.save()
       return res.status(200).json({message:"Post successfully created",savedPost})
    }
    catch(error){
        res.json({message:"Error creating"})
        console.log("Error creating ",error)
    }
})

router.put('/update/:id',verifyToken,async(req, res) => {
    try{

      const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

      return res.status(200).json(updatedPost)
    }
    catch(error){
       res.json({message:"Error updating"})
       console.log("Error updating ",error)
    }
})

router.delete('/delete/:id',verifyToken,async(req, res) => {
   try{
      const post=await Post.findByIdAndDelete(req.params.id);
      
      if(!post){
        return res.status(401).json({message:"post not found"})
      }
      await Comment.deleteMany({postId:req.params.id})
      return res.status(200).json({message:"post successfully deleted"})
   }
   catch(error){
    res.json({message:"Error deleting"})
    console.log("Error deleting ",error)
   }
})

router.get("/:id",async(req, res) => {
    try{

        const post=await Post.findById(req.params.id).select("-password")
        if(!post){
            return res.status(401).json({message:"Post not found"})
        }
        return res.status(200).json({message:"Post successfully fetched",post})
    }
    catch(error){
        res.json({message:"Error fetching post details"})
        console.log("Error fetching post details",error)
    }
})

router.get("/",async(req, res) => {

    const query=req.query

    try{
        const searchFilter={
            title:{$regex:query.search,$options:"i"}
        }

        const posts=await Post.find(query.search? searchFilter : null)

        if(!posts){
            return res.status(401).json({message:"Posts not found"})
        }
        return res.status(200).json(posts)
    }
    catch(error){
        res.json({message:"Error fetching all posts"})
        console.log("Error fetching all posts ",error)
    }
})

router.get("/user/:userId",async(req, res) => {
    try{

        const posts=await Post.find({userId:req.params.userId}).select("-password")

        if(!posts){
            return res.status(401).json({message:"Posts not found"})
        }
        return res.status(200).json({message:"User Posts successfully fetched",posts})
    }
    catch(error){
        res.json({message:"Error fetching user posts"})
        console.log("Error fetching user posts ",error)
    }
})



export default router;