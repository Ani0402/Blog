import { createContext, useState,useEffect } from "react";
import axios from "axios";
import { URL } from '../../utils/constants'

export const UserContext=createContext({});

export const UserContextProvider=({children})=>{
    const [user,setUser]=useState(null);
     
    useEffect(()=>{
        getUser()
    },[])

    const getUser=async()=>{
        try{
          const res=await axios.get(`${URL}/api/auth/refetch`,{withCredentials:true})
          setUser(res.data)
        }
        catch(error){
           console.log("Error in getUsr in userContext.jsx ",error);
        }
    }


   return (
    <UserContext.Provider value={{user,setUser}}>
     {children}
    </UserContext.Provider>
   )
}

