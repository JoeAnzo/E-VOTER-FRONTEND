import React,{useContext, useState} from 'react'
import { userContext } from '../Contexts/userContext';
import {User} from 'lucide-react'
import Logo from './Logo';
function UserProfile({studentInfo}) {

   console.log(studentInfo)
  return (
   <nav 
   className='flex justify-between items-center bg-[#1E293B] shadow-xl pl-2 py-4'>
         <div className='flex items-center justify-center gap-2'>
            <Logo/>
            <h1 className='text-2xl text-white'>E voter</h1>
         </div>
         <div className='flex gap-1 items-center text-white'>
            <User size={30}/> 
            <h2 className='mr-4'>
               {studentInfo.name}<br/>
               {studentInfo.class} {studentInfo.stream}
            </h2>
         </div>
   </nav>
  )
}

export default UserProfile;
