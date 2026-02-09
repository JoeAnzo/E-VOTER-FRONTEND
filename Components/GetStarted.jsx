import React, { useContext } from 'react'
import Header from './Header';
import Login from './login';
import { Link } from 'react-router-dom';
import { Vote } from 'lucide-react';
import { userContext } from '../src/App';

function GetStarted() {
  const {role} = useContext(userContext)
  
  return (
    <>
       <Header/>
       <div className='background h-screen'>
           <div className='flex flex-col wrapper justify-center items-center h-full'>
                <Vote size={200} color='white'/>
               <div className='px-4'>
                  <p className='text-white text-center max-w-[75ch] px-4'>
                  Welcome to E-voter, your dedicated space for shaping the future of your school community! Your voice is powerful and essential.
                   Here, you can securely cast your vote on important matters, from student council elections to key policy decisions. 
                   Every ballot you submit helps build a more representative and vibrant school environment.
                   Thank you for participating let's make your voice heard.
                  </p>
                  <div className='flex mt-10'>
                      <button className=' text-white bg-blue-500 py-4 px-10 w-full mx-auto rounded-xl cursor-pointer hover:opacity-80'>
                          <Link to="/login">Start Voting</Link>
                      </button>
                  </div>
               </div>
           </div>
       </div>
    </>
  )
}

export default GetStarted
