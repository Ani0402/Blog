import React from 'react'

function ProfilePosts() {
    
  return (
    <div className='w-full flex mt-8 space-x-3'>
       <div className='w-[35%] h-[200px] flex justify-center items-center'>
          <img src="https://static.digit.in/banner-3.jpg" alt="AI Image" className="h-full w-full object-cover"></img>
       </div>

       <div className='flex flex-col w-[65%]'>

         <h1 className='text-xl font-bold md:mb-2 mb-1 nd:text-2xl'>
         Best AI Image Generator Apps 2024 (Free and Paid)
         </h1>

         <div className='flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4'>
           <p>@animesh</p>
           <div className='flex space-x-2'>
             <p>15/6/2022</p>
             <p>16:22</p>
           </div>       
         </div>

         <p className='text-sm md:text-lg'>It’s often not easy to find the right image for your content when you need it. AI image generator apps can help you save some time designing images and thus can be a great asset for publishers and marketers.</p>

       </div>
    </div>
  )
}

export default ProfilePosts
