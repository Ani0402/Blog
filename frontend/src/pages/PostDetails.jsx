import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Comment from '../components/Comment';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { URL } from '../../utils/constants'
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader'
import { IF } from '../../utils/constants'
import { useNavigate } from 'react-router-dom';

function PostDetails() {

  const postId=useParams().id

  const [post,setPost]=useState({})

  const {user}=useContext(UserContext)

  const [loader,setLoader] = useState(false)

  const [comments,setComments] = useState([])

  const [comment,setComment] = useState("")

  const navigate=useNavigate()

  const fetchPost=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(`${URL}/api/posts/${postId}`)
      setPost(res.data.post)
      setLoader(false)
    }
    catch(error){
      setLoader(true)
      console.log(error);
    }
  }

  const fetchPostComments=async()=>{
    try{
       const res=await axios.get(`${URL}/api/comments/post/${postId}`)
       setComments(res.data.comment)
    }
    catch(error){
      console.log(error)
    }
  }

  const handleDelete=async()=>{
      try{
        const res=await axios.delete(`${URL}/api/posts/delete/${postId}`,{withCredentials:true})

        navigate("/")
      }
      catch(error){
        console.log("Error in post details ",error)
      }
  }

  const postComment=async(e)=>{
    e.preventDefault()
    try{
       const res=await axios.post(`${URL}/api/comments/create`,{comment:comment,author:user.username,postId:postId,userId:user._id},{withCredentials:true})

       setComment("")
       fetchPostComments()
    }
    catch(error){
      console.log("Error in post details ",error)
    }
  }

  useEffect(()=>{
     fetchPost()
     fetchPostComments()
  },[postId])

  return (
    <div>
      <Navbar/>

       { loader ? <div className='h-[40vh] flex justify-center items-center'> <Loader/> </div> : 
       <div className="px-8 md:px-[200px] mt-8">
         
         <div className="flex justify-between items-center">
           <h1 className="text-2xl font-bold text-black md:text-3xl">
           {post.title}
           </h1>
           { user?._id ===post?.userId &&  <div className="flex items-center justify-center space-x-2">
           <p className="cursor-pointer" onClick={()=>navigate("/edit/"+postId)}><ModeEditIcon/></p>
           <p onClick={handleDelete} className="cursor-pointer"><DeleteIcon/></p>
           </div>}
         </div>

         <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
            <div className='flex space-x-2'>
            <p> {new Date(post.updatedAt).toString().slice(0,15)} </p>
            <p> {new Date(post.updatedAt).toString().slice(15,24)} </p>
            </div> 
         </div>

         <img src={IF+post.photo} className="w-full mx-auto mt-8" alt="src-image"/>
       
         <p className="mx-auto mt-8">{post?.description}.</p>

         <div className="flex items-center mt-8 space-x-4 font-semibold">
           <p>Categories:</p>
           <div className="flex justify-center items-center space-x-2">
              {
                post?.categories?.map((c,i)=>(
                  
                  <div key={i} className="bg-gray-200 rounded-lg px-3 py-1">{c}</div>
                  
                  
                ))
              }
              
           </div>
         </div>

         <div className="flex flex-col mt-3">
           <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>

            {
              comments?.map((c)=>(
                <Comment key={c._id} c={c} post={post}/>
              ))
            }

         </div>

         <div className='w-full flex flex-col mt-4 md:flex-row'>
           <input value={comment} onChange={(e)=>setComment(e.target.value)} className="md:w-[80%] outline-none px-4 mt-4 md:mt-0" placeholder="Write a comment"/>
           <button onClick={postComment} className="bg-black text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0 hover:bg-gray-700">Add Comment</button>
         </div>
       </div>
}

      <Footer/>
    </div>
  )
}

export default PostDetails
