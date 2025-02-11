import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfilePosts from '../components/ProfilePosts'
import axios from 'axios';
import { URL } from '../../utils/constants'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Profile() {
  const param=useParams().id
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [posts,setPosts]=useState([])
  const {user,setUser}=useContext(UserContext)
  const navigate=useNavigate()
  const [updated,setUpdated]=useState(false)

  const fetchProfile = async() =>{
    try{
      const res=await axios.get(`${URL}/api/users/${user._id}`)
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
    }
    catch(error){
      console.log(error);
    }
  }

  const handleUserUpdate = async() =>{
    setUpdated(false)
    try{
      const res=await axios.put(`${URL}/api/users/${user._id}`,{username,email,password},{withCredentials:true})

      setUpdated(true)
    }
    catch(error){
      console.log(error);
      setUpdated(false)
    }
  }

  const handleUserDelete = async() =>{
    try{
       const res=await axios.delete(`${URL}/api/users/${user._id}`,{withCredentials:true})
       setUser(null)
       navigate("/")
    }
    catch(error){
      console.log(error);
    }
  }

  const fetchUserPosts=async()=>{
     try{
        const res=await axios.get(`${URL}/api/posts/user/${user._id}`)
        setPosts(res.data)
     }
     catch(error){
      console.log(error);
     }
  }

  useEffect(()=>{
    fetchProfile()
    fetchUserPosts()
  },[param])

  return (
    <div>
       <Navbar/>

       <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start">

          <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
            <h1 className='text-xl font-bold mb-4'>Your Posts</h1>
            <ProfilePosts/>
            <ProfilePosts/>
            <ProfilePosts/>
            <ProfilePosts/>
          </div>

          <div className="md:sticky md:top-10 flex justify-start md:justify-end items-start  md:w-[30%] w-full md:items-end">
            <div className="flex flex-col space-y-4 items-start">
                <h1 className='text-xl font-bold mb-4'>Profile</h1>
                    <input type="text" className="outline-none px-4 py-2 text-gray-500 border border-black" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
                    <input type="email" className="outline-none px-4 py-2 text-gray-500 border border-black" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" className="outline-none px-4 py-2 text-gray-500 border border-black" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                    <div className="flex items-center space-x-4 mt-8">
                    <button onClick={handleUserUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-500">Update</button>
                    <button onClick={handleUserDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-500">Delete</button>
                    </div>
                    {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully</h3>}
            </div>

          </div>

       </div>

       <Footer/>
    </div>
  )
}

export default Profile
