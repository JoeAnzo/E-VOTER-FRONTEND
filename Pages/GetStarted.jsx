import React, { useContext } from 'react'
import Header from '../Components/UserProfile';
import Login from './Login';
import { Link,useNavigate } from 'react-router-dom';
import {Shield,Users2,CircleCheckBigIcon} from 'lucide-react';
import votingIMG from '../src/assets/voting.png'
import Logo from '../Components/Logo';
import FeatureCard from '../Components/FeatureCard.jsx';
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
                <h1 className='my-4 text-3xl text-white'>E voter</h1>
                <img className='h-[300px] w-[300px]' src={votingIMG} alt="voting-image" />
               <div>
                  <p className='text-center text-white my-10'>
                    Your voice. Elect your school leaders <br/> digitally.
                  </p>
                  <div className='flex mt-10'>
                        <button onClick={handleClick} className=' text-white bg-[#5478FF] py-2.5 px-10 w-full sm:w-auto mx-auto rounded-xl cursor-pointer hover:opacity-80'>
                            Get Started
                        </button>
                   </div>
                  <div className=' flex flex-col my-20 sm:flex-row justify-center items-center gap-10'>
                      <FeatureCard index={0} textHeading='Secure' textParagraph='Every vote is secure and counted fairly' icon={<Shield color='white' size={80} className='bg-[#5478FF] p-4 rounded-full'/>}/>
                      <FeatureCard index={1} textHeading='Easy' textParagraph='Simple login no password needed' icon={<Users2 color='white' size={80} className='bg-[#5478FF] p-4 rounded-full'/>}/>
                      <FeatureCard index={2} textHeading='Fair' textParagraph='One Student one vote per post' icon={<CircleCheckBigIcon color='white' size={80} className='bg-[#5478FF] p-4 rounded-full'/>}/>
                  </div>
               </div>
           </div>
           <div className='text-center bottom-0 mt-4 text-white'>
                <div className='flex gap-2'>
                    <Link  to='/about'>About us</Link>
                    <Link  to='/contact'>Contact us</Link>
                    <Link  to='/terms'>Terms and conditions</Link>
                    <Link  to='/privacy'>Privacy Policy</Link>
                </div>
                <p className='mt-2'>©{currentYear} E-voter School Elections Made Simple</p>
            </div>
       </div>
    </>
  )
}

export default GetStarted
