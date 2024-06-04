import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path:".env"
})

const connectDB=async()=>{
   try{
     const DB_URL=process.env.DB_URL;
     await mongoose.connect(DB_URL)
     console.log("Connected to MongoDB")
   }
   catch(error){
    console.log("Error in connecting to MongoDB ",error)
   }
}

export default connectDB;
