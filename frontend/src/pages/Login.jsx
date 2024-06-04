import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'
import { URL } from '../../utils/constants'

import { UserContext } from '../context/UserContext'


function Login() {

  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const [error,setError] = useState(false)
  const navigate = useNavigate()
  const {setUser}=useContext(UserContext)

  const handleLogin=async()=>{
     try{
        const res=await axios.post(`${URL}/api/auth/login`,{email:email,password:password},{
          withCredentials:true
        })
        setUser(res.data)
        setError(false)
        navigate("/")
     }
     catch(error){
      setError(true)
      console.log("Error in handleRegister login.jsx ",error);
     }
  }

  return (
    <>
      <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className='text-lg md:text-2xl font-semibold'><Link to="/">BlogIt</Link></h1>
        <h3><Link className="text-black" to="/register">Register</Link></h3>
      </div>
      <div className='w-full flex justify-center items-center h-[60vh] '>
        
          <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          
          <h1 className='text-xl font-semibold text-left'>Login to your account</h1>

          <input className="w-full px-4 py-2 border-black outline-0 hover:border-2" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Email" />
          <input className="w-full px-4 py-2 border-black outline-0 hover:border-2" value={password} onChange={(e)=>setPassword(e.target.value)}type="password" placeholder="Password"/>

          <button className="w-[95px] px-2 py-2 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black" onClick={handleLogin}>Login</button>

          <div className="flex justify-center items-center space-x-4">
          
              <p>New Here?</p>
              <p><Link className="text-blue-600" to="/register">Register</Link></p>

          </div>

          </div>

      </div>

      <Footer/>
      
    </>
  )
}

export default Login
