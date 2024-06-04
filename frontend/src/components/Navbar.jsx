import React,{useState} from 'react'
import {Link,useLocation,useNavigate} from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from './Menu';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import axios from 'axios'
import { URL } from '../../utils/constants'


function Navbar() {

  const [menu,setMenu]=useState(false)

  const[prompt,setPrompt] = useState("")

  const showMenu=()=>{
     setMenu((prev)=>!prev)
  }

  const navigate=useNavigate()

  const {user}=useContext(UserContext)

  const path=useLocation().pathname
  
  return (
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
       <h1 className='text-lg md:text-2xl font-semibold'><Link to="/">BlogIt</Link></h1>

       {path==="/" && <div className='flex justify-center items-center space-x-0'>
          <p className='cursor-pointer' onClick={()=>navigate(prompt? "?search="+prompt : navigate("/"))}><SearchIcon/></p>

          <input value={prompt} onChange={(e)=>setPrompt(e.target.value)} type="text" placeholder="Search" className="outline-none px-3 py-1" />
       </div>}

       <div className='hidden md:flex items-center justify-center space-x-2 md:space-x-4'>
          {user? <h3><Link to="/write">Write</Link></h3> : <h3><Link to="/login">Login</Link></h3> }

          {user ? 
            <div onClick={showMenu}>
              <p><MenuIcon className="hover:cursor-pointer"/></p>
              {menu && <Menu/>}
            </div>
            :<h3><Link to="/register">Register</Link></h3>}
       </div>

       <div onClick={showMenu} className="md:hidden text-lg">
         <p><MenuIcon className="hover:cursor-pointer relative"/></p> 
         {
            menu && <Menu/>
         }
       </div>
    </div>
  )
}

export default Navbar
