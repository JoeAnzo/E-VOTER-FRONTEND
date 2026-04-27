import React, { useContext } from 'react'
import Header from '../Components/UserProfile';
import Login from './Login';
import { Link,useNavigate } from 'react-router-dom';
import {Shield,Users2,CircleCheckBigIcon} from 'lucide-react';
import votingIMG from '../src/assets/voting.png'
import Logo from '../Components/Logo';
import FeatureCard from '../Components/FeatureCard.jsx';
import { getCurrentYear } from '../utils/currentDate.js';
import ThemeIcon from '../Components/ThemeIcon.jsx';
import {Helmet} from 'react-helmet'
function GetStarted() {
  const navigate = useNavigate()
  const currentYear = getCurrentYear()
function handleClick(){
    navigate('/auth/student/login')
}
  return (
    
    <>
       <Helmet>
            <title>Get Started</title>
            <meta name="description" content="Join E-voter today and experience the future of school elections. Our secure, easy-to-use platform empowers students to vote for their school leaders with confidence. Say goodbye to paper ballots and hello to a seamless digital voting experience. Get started now and make your voice heard in your school's democratic process." />
            <meta name="keywords" content="E-voter, school elections, digital voting, secure voting, easy-to-use platform, student voting, school leaders, democratic process" />
       </Helmet>
       <div className='flex flex-col justify-center items-center relative bg-white dark:bg-[#0F172A]'>
           <div className='absolute right-10 top-10'>
            <ThemeIcon/>
           </div>
           <div className='flex flex-col justify-center items-center pt-4'>
                  <Logo/>
                <h1 className='my-4 text-3xl text-slate-900 dark:text-white'>Evoter</h1>
                <img className='h-75 w-75' src={votingIMG} alt="voting-image" />
               <div>
                  <p className='text-center text-slate-900 dark:text-white my-10'>
                    Your voice. Elect your school leaders <br/> digitally.
                  </p>
                  <div className='flex mt-10'>
                        <button onClick={handleClick} className=' text-white bg-[#5478FF] py-2.5 px-10 w-full sm:w-auto mx-auto rounded-xl cursor-pointer hover:opacity-80'>
                            Get Started
                        </button>
                   </div>
                  <div className=' flex flex-col my-20 sm:flex-row justify-center items-center sm:gap-10 gap-20'>
                      <FeatureCard index={0} textHeading='Secure' textParagraph='Every vote is secure and counted fairly' icon={<Shield color='white' size={80} className='bg-[#5478FF] p-4 rounded-full'/>}/>
                      <FeatureCard index={1} textHeading='Easy' textParagraph='Simple login no password needed' icon={<Users2 color='white' size={80} className='bg-[#5478FF] p-4 rounded-full'/>}/>
                      <FeatureCard index={2} textHeading='Fair' textParagraph='One Student one vote per post' icon={<CircleCheckBigIcon color='white' size={80} className='bg-[#5478FF] p-4 rounded-full'/>}/>
                  </div>
               </div>
           </div>
           <div className='text-center bottom-0 mt-4 dark:text-white text-slate-900'>
                <div className='flex gap-2 pl-2'>
                    <Link className='underline'  to='/about'>About us</Link>
                    <Link className='underline'  to='/Contact-Us'>Contact us</Link>
                    <Link className='underline'  to='/terms'>Terms and conditions</Link>
                    <Link className='underline'  to='/privacy'>Privacy Policy</Link>
                </div>
                <p className='mt-20'>©{currentYear} E-voter School Elections Made Simple</p>
            </div>
       </div>
    </>
  )
}

export default GetStarted
