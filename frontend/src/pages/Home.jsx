import React, { useEffect, useState, useContext } from 'react'
import HomePosts from '../components/HomePosts'
import Footer from '../components/Footer'
import {Link,useNavigate} from "react-router-dom"
import Navbar from '../components/Navbar'
import axios from 'axios'
import { URL } from '../../utils/constants'
import { useLocation } from 'react-router-dom'
import Loader from "../components/Loader"
import { UserContext } from "../context/UserContext"

function Home() {

  const [posts,setPosts]=useState([])
  
  const [noResults,setNoResults] = useState(false)

  const [loader,setLoader] = useState(false)

  const {search}=useLocation()

  const {user}=useContext(UserContext)

  const fetchPosts = async() =>{
    setLoader(true)
      try{
         const res=await axios.get(`${URL}/api/posts/${search}`)
         setPosts(res.data)
         
         if(res.data.length===0){
          setNoResults(true)
         }else{
          setNoResults(false)
         }
         setLoader(false)
      }
      catch(error){
        console.log("Error in home.jsx",error)
        setNoResults(true)
      }
  }

  useEffect(()=>{
    fetchPosts()
  },[search])

  return (
    <>
      <Navbar/>

      <div className='px-8 md:px-[200px] min-h-[80vh]'>

        { loader? <div className='h-[40vh] flex justify-center items-center'> <Loader/> </div> : 
          !noResults ? 
          posts.map((post)=>(
            <>
            <Link to={user?`/posts/post/${post._id}`:"/login"}>
            <HomePosts key={post._id} post={post}/>
            </Link>
            </>
          ))
          :
          <h3 className="text-center font-bold text-xl">No posts found</h3>
        }
      </div>
      
      <Footer/>
    </>
    
  )
}

export default Home
