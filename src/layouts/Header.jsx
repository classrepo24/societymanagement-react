import React from 'react'
import profile from '../assets/profile.svg'

export const Header = ({setIsSidebarOpen}) => {
  return (
    <div className='flex items-center justify-between px-6 py-4 bg-white shadow'>


        <div className='flex items-center'>
            <button  onClick={()=>setIsSidebarOpen(show => !show)} className='text-2xl cursor-pointer'> ☰ </button>
        </div>
        

      
<div className='flex-1 max-w-md mx-6'>
      <input
        type="text"
        placeholder="Search..."
        className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none'
      />
</div>


<div className='flex items-center gap-6'>
     <button className="text-xl cursor-pointer">
            🔔 
    </button>

    <div className="h-10 border-l border-gray-200"></div>

      <div className="flex items-center gap-3">
       <img src={profile} alt="Profile" className='w-12 h-13 rounded-full p-2 bg-gray-100'/>

        <div>
          <h4 className='font-semibold'>Admin User ^</h4>
          <p className='text-sm text-gray-500'>Society Admin</p>
        </div>
      </div>
</div>
    </div>
  )
}