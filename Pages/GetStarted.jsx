import React, { useContext } from 'react'
import Header from '../Components/UserProfile';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import {Shield,Users2,CircleCheckBigIcon} from 'lucide-react';
import votingIMG from '../src/assets/voting.png'
import Logo from '../Components/Logo';
import { getCurrentYear } from '../utils/currentDate.js';
function GetStarted() {
  const navigate = useNavigate()
  const currentYear = getCurrentYear()
function handleClick(){
    navigate('/auth/student/login')
}
  return (
    
    <>
       <div className='flex flex-col justify-center items-center relative bg-[#192346]'>
           <div className='flex flex-col justify-center items-center pt-4'>
                <Logo/>
                <h1 className='my-4 text-3xl text-white'>E-voter</h1>
                <img className='h-[300px] w-[300px]' src={votingIMG} alt="voting-image" />
               <div>
                  <p className='text-center text-white my-10'>
                    Your voice. Elect your school leaders <br/> digitally.
                  </p>
                  <div className='flex mt-10'>
                        <button onClick={handleClick} className=' text-white bg-[#5478FF] py-2.5 px-10 w-full sm:w-[10%} mx-auto rounded-xl cursor-pointer hover:opacity-80'>
                            Get Started
                        </button>
                   </div>
                  <div className=' flex flex-col my-20 sm:flex-row justify-center items-center gap-10'>
                      <div className='flex flex-col items-center h-full justify-center'>
                          <Shield color='white' size={80} className='bg-[#5478FF] p-4 rounded-full'/>
                          <h2 className='my-2 text-white'>Secure</h2>
                          <p className='text-white'>Every vote is secure and counted fairly</p>
                      </div>
                      <div className='flex flex-col h-full items-center'>
                          <Users2 color='white' size={80} className='bg-[#5478FF] p-4 rounded-full'/>
                          <h2 className='my-2 text-white'>Easy</h2>
                          <p className='text-white'>Simple login no password needed</p>
                      </div>
                      <div className='flex flex-col  items-center'>
                          <CircleCheckBigIcon color='white' size={80} className='bg-[#5478FF] p-4 rounded-full'/>
                          <h2 className='my-2 text-white'>Fair</h2>
                          <p className='text-white'>One Student one vote per post</p>
                      </div>
                  </div>
               </div>
           </div>
           <p className='text-center bottom-0 mt-4 text-white'>©{currentYear} E-voter School Elections Made Simple</p>
       </div>
    </>
  )
}

export default GetStarted
