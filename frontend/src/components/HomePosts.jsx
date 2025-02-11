import React from 'react'
import { IF } from '../../utils/constants'


function HomePosts({post}) {
  return (
    <div className='w-full flex mt-8 space-x-3'>
       <div className='w-[35%] h-[200px] flex justify-center items-center'>
          <img src={IF+post.photo} alt="AI Image" className="h-full w-full object-cover"></img>
       </div>

       <div className='flex flex-col w-[65%]'>

         <h1 className='text-xl font-bold md:mb-2 mb-1 nd:text-2xl'>
         {post.title}
         </h1>

         <div className='flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4'>
           <p>@{post.username}</p>
           <div className='flex space-x-2'>
             <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
             <p>{new Date(post.updatedAt).toString().slice(15,24)}</p>
           </div>       
         </div>

         <p className='text-sm md:text-lg'>{post.description.slice(0,100)+ " ...Read More"}</p>

       </div>
    </div>
  )
}

export default HomePosts
