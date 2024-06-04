import React, { useContext } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { URL } from '../../utils/constants'
import { UserContext } from '../context/UserContext';

function Comment({c,post}) {

  const {user}=useContext(UserContext)

  const handleDelete=async()=>{
    try{
      const res=await axios.delete(`${URL}/api/comments/delete/${c._id}`,{withCredentials:true})
      window.location.reload(true)
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
        <div className="flex items-center justify-between bg-gray-200 rounded-lg">
        <h3 className="font-bold text-gray-600">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
            <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(0,15)}
            </p>
            <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(15,24)}
            </p>

            {
               user?._id === c?.userId ?
               <div className="flex items-center justify-center space-x-2">
               <p onClick={handleDelete} className="cursor-pointer"><DeleteIcon/></p>
               </div> : "" 
            }

           
        </div>
        </div>
             <p className="px-2 mt-2">{c.comment}</p>
    </div>
  )
}

export default Comment
