import React,{useContext, useState} from 'react'
import { userContext } from '../Contexts/userContext';
import {User} from 'lucide-react'
import Logo from './Logo';
import ThemeIcon from './ThemeIcon';
function UserProfile({studentInfo}) {

   console.log(studentInfo)
  return (
   <nav 
   className='flex justify-between bg-white items-center dark:bg-[#1E293B] dark:text-white shadow-xl pl-2 py-4'>
         <div className='flex items-center justify-center gap-2'>
            <Logo/>
            <h1 className='text-2xl text-slate-900 dark:text-white'>Evoter</h1>
         </div>
         <div className='flex gap-1 items-center dark:text-white text-slate-900'>
            <User size={30}/> 
            <h2 className='mr-2'>
               {studentInfo.name}<br/>
               {studentInfo.class} {studentInfo.stream}
            </h2>
            <div className='mr-2'>
               <ThemeIcon/>
            </div>
         </div>
   </nav>
  )
}

export default UserProfile;
