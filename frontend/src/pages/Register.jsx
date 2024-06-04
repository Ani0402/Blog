import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'
import { URL } from '../../utils/constants'


function Register() {

  const [username,setUsername] =useState("")
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const [error,setError] = useState(false)

  const navigate=useNavigate()

   const handleRegister=async()=>{
      try{
        const res=await axios.post(`${URL}/api/auth/register`,{username:username,password:password,email:email})

        setUsername(res.data.username)
        setEmail(res.data.email)
        setPassword(res.data.password)
        setError(false)
        navigate('/login')
      }
      catch(error){
        setError(true)
        console.log("Error in handleRegister register.jsx ",error);
      }
   }

  return (
    <>

    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
    <h1 className='text-lg md:text-2xl font-semibold'><Link to="/">BlogIt</Link></h1>
    <h3><Link className="text-black" to="/login">Login</Link></h3>
    </div>

      <div className='w-full flex justify-center items-center h-[60vh] '>

        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">

          <h1 className='text-xl font-semibold text-left'>Create an Account</h1>

          <input className="w-full px-4 py-2 border-black outline-0 hover:border-2" type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          <input className="w-full px-4 py-2 border-black outline-0 hover:border-2" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input className="w-full px-4 py-2 border-black outline-0 hover:border-2" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

          <button className="w-[95px] px-2 py-2 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black" onClick={handleRegister}>Register</button>
          {error && <h3 className="text-red-500 text-sm">Something went wrong</h3>} 

          <div className="flex justify-center items-center space-x-4">

              <p>Already have an account?</p>
              <p><Link className="text-blue-600" to="/login">Login</Link></p>

          </div>

        </div>

      </div>
      <Footer/>
    </>
    
  )
}

export default Register
