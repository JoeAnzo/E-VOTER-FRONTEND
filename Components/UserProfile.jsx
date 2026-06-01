import React,{useContext, useState} from 'react'
import { userContext } from '../Contexts/userContext';
import {User} from 'lucide-react'
import Logo from './Logo';
import ThemeIcon from './ThemeIcon';
function UserProfile({studentInfo}) {

   console.log(studentInfo)
  return (
   <nav 
   className='flex justify-between bg-white items-center dark:bg-[#1E293B]/30 dark:text-white/30 backdrop-filter backdrop-blur-xl  shadow-xl pl-2 py-2 border-1 border-gray-400'>
         <div className='flex items-center justify-center gap-2'>
            <Logo/>
            <h1 className='sm:text-2xl text-xl text-slate-900 dark:text-white'>Evoter</h1>
         </div>
         <div className='flex justify-center items-center dark:text-white text-slate-900'>
            <User size={30}/> 
            <h2 className='text-center px-1.5'>
               {studentInfo.name}<br/>
               {studentInfo.class} {studentInfo.stream}
            </h2>
            <div className='mr-1'>
               <ThemeIcon/>
            </div>
         </div>
   </nav>
  )
}

export default UserProfile;
