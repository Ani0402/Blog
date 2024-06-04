import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRouter from './routes/auth.js'
import userRouter from './routes/userRoutes.js'
import commentRouter from './routes/commentRoutes.js'
import postRouter from './routes/postsRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({
    path:".env"
})

connectDB()

const PORT=process.env.PORT || 4000;

const app = express();

app.use(express.json())
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/posts",postRouter)
app.use("/api/comments",commentRouter)

const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload=multer({storage:storage})

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("image uploaded successfully")
})

app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
})