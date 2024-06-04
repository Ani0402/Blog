import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config({
    path:".env"
})

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token

    if(!token){
        return res.status(401).json({message:"User not authenticated"})  
    }

    jwt.verify(token,process.env.SECRET_KEY,async(err,data)=>{
        if(err) {
            return res.status(403).json({message:"Token not valid"})
        }
        req.userId=data._id
        next();
    })
}

export default verifyToken;