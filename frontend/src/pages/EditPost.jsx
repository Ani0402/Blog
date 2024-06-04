import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { URL } from '../../utils/constants'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';



function EditPost() {

    const postId=useParams().id
    const {user} =useContext(UserContext)
    const navigate=useNavigate()

    const [category,setCategory]=useState("")
    const [categories,setCategories]=useState([])
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [file,setFile]=useState(null)

    const fetchPost=async()=>{
      try{
        const res=await axios.get(`${URL}/api/posts/${postId}`)
        setTitle(res.data.post.title)
        setDescription(res.data.post.description)
        setFile(res.data.post.photo)
        setCategories(res.data.post.categories)
      }
      catch(error){
        console.log(error)
      }
    }

    const handleUpdate=async(e)=>{
      e.preventDefault()
      try{
          const post={
           title:title,
           description:description,
           username:user.username,
           userId:user._id,
           categories:categories
          }
 
          
          if(file){
 
           const data=new FormData();
           const filename=Date.now()+file.name
           data.append("img",filename)
           data.append("file",file)
           post.photo=filename
 
           try{
             const imgUpload=await axios.post(`${URL}/api/upload`,data)
           }
           catch(error){
            console.log(error);
           }
 
          }
 
          try{
             const res=await axios.put(`${URL}/api/posts/update/${postId}`,post,{
               withCredentials:true
             })
             navigate("/posts/post/"+res.data._id)
             
          }
          catch(error){
           console.log(error);
          }
 
 
      }
      catch(error){
       console.log("Error creating posts ",error);
      }
    }
  
    const addCategory=()=>{
      let updatedCategory=[...categories]
  
      updatedCategory.push(category)
      setCategory("")
      setCategories(updatedCategory)
    }
  
    const deleteCategory=(index)=>{
       let updatedCategory=[...categories]
  
       updatedCategory.splice(index)
       setCategories(updatedCategory)
    }

    useEffect(()=>{
      fetchPost()
    },[postId])

  return (
    <div>
      <Navbar/>
        <div className="px-6 md:px-[200px] mt-8">
           <h1 className="font-bold md:text-2xl text-xl">Update Post</h1>

           <form className='w-full flex flex-col space-y-4 md:space-x-8 mt-4'>
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter post title" className="px-4 py-2 outline-none"/>
              <input type="file" onChange={(e)=>setFile(e.target.files[0])} placeholder="Enter file" className="px-4 py-2 outline-none"/>
              <div className="flex flex-col">
                <div className="flex items-center space-x-4 md:space-x-8">
                   <input className="px-4 py-2 outline-none hover:border border-black" placeholder="Enter post category" type="text" value={category} onChange={(e)=>setCategory(e.target.value)}/>
                   <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer ">
                       Add
                   </div>
                </div>

                <div className="flex px-4 mt-3">
                  {categories?.map((c,i)=>(
                    <div key={i} className="flex justify-center items-center space-x-2 bg-gray-200 px-2 py-1 rounded-md">
                      <p>{c}</p>
                      <p onClick={()=>deleteCategory(i)} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"><CloseIcon/></p>
                    </div>
                  ))}

                  
              
                </div>

              </div>

              <textarea rows={15} cols={30} className="px-4 py-2 outline-none border border-black" placeholder="Enter post description " value={description} onChange={(e)=>setDescription(e.target.value)}/>
              <div className="flex justify-center items-center">
              <button className="bg-black w-full md:w-[20%] mx-auto font-semibold  text-white px-4 py-2 md:text-xl text-lg" onClick={handleUpdate}>Update</button>
              </div>
              
           </form>
        </div>
      <Footer/>
    </div>
  )
}

export default EditPost
