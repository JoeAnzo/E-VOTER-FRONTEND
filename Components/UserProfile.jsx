import React,{useContext, useState} from 'react'
import { userContext } from '../Contexts/userContext';
import {User} from 'lucide-react'
import Logo from './Logo';
function UserProfile({username}) {
  const {name,grade,stream} = useContext(userContext)
  const [displayUserDetails,setDisplayUserDetails] = useState(false)

  return (
   <nav 
   className='flex justify-between items-center bg-[#101540] shadow-xl pl-2 py-4'>
         <div className='flex items-center justify-center gap-5'>
            <Logo/>
            <h1 className='text-2xl text-white'>E-Voter</h1>
         </div>
         <div className='flex gap-1 items-center text-white'>
            <User size={30}/> 
            <h2 className='mr-4'>{username}</h2>
         </div>
   </nav>
  )
}

export default UserProfile;
