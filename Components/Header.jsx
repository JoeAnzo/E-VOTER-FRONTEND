import React,{useContext, useEffect, useRef, useState} from 'react'
import { Vote,User,ChevronDown } from 'lucide-react';
import { userContext } from '../src/App';
function Header() {
  const {role,setRole} = useContext(userContext)
  const [showOptions,setShowOptions] = useState(false)
  const options = useRef()
  useEffect(()=>{
   if (options.current){
      const values = options.current.querySelectorAll('h2')
      values.forEach((v) => v.addEventListener('click',handleSelect))
   }
  },[])
  function handleClickDropdown(){
   setShowOptions(prev => !prev)
  }
  function handleSelect(e){
   setRole(e.target.innerText)
   setShowOptions(false)
  }
  return (
   <header className='py-8 bg-blue-500 flex justify-between relative'>
          <div className='flex items-center  ml-5'>
              <Vote color='white' size={30}/><h1 className='text-white text-2xl sm:text-3xl ml-2'>E-voter</h1>
          </div>
          <div className='flex items-center gap-1.5'>
             <User color='white' size={25}/>
             <h1 className='text-white sm:text-3xl text-2xl'>{role}</h1>
              <ChevronDown onClick={handleClickDropdown} color='white' className='cursor-pointer'/>
          </div>
          <div ref={options} className={`absolute ${showOptions ? null : 'hidden'} cursor-pointer top-full right-0 bg-blue-500 px-10 space-y-1 text-white`}>
             <h2>Student</h2>
             <h2 className='pb-4'>Staff Member</h2>
          </div>
    </header>
  )
}

export default Header
