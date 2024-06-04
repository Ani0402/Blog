import React from 'react'
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { URL } from '../../utils/constants'
import { Link, useNavigate } from 'react-router-dom';

function Menu() {
 
  const {user,setUser}=useContext(UserContext)
  const navigate=useNavigate()


  const handleLogout=async()=>{
     try{
        const res=await axios.get(`${URL}/api/auth/logout`,{withCredentials:true})  
        setUser(null)
        navigate("/login")
     }
     catch(error){
      console.log(error)
     }
  }


  return (
    <div className="bg-black w-[200px] flex flex-col items-start absolute top-12 right-8 md:right-12 rounded-md p-2 space-y-3 z-10">
      {!user && <h1 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h1>}

      {!user &&  <h1 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/register">Register</Link></h1>}

      {user &&  <h1 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/"+user._id}>Profile</Link></h1>}

      {user &&  <h1 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Write</Link></h1>}

      {user &&  <h1 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/myblogs/"+user._id}>MyBlogs</Link></h1>}

      {user &&  <h1 className="text-white text-sm hover:text-gray-500 cursor-pointer" onClick={handleLogout}>Logout</h1>}
      
    </div>
  )
}

export default Menu
