import React, { useContext,useEffect,useRef,useState } from 'react'
import {Navigate, useNavigate,Link} from 'react-router-dom'
import { ChevronDown,User,CircleCheckBig,LogIn,CircleAlert } from 'lucide-react';
import Dropdown from '../Components/DropDown.jsx'
import SearchResults from '../Components/SearchResults.jsx';
import Logo from '../Components/Logo.jsx';
import { selectContext } from '../Contexts/selectContext.js';
import ThemeIcon from '../Components/ThemeIcon.jsx';
import { userContext } from '../Contexts/userContext.js';
import {searchStudent,fetchStudent} from '../Services/ApiCalls.js';
import useDebounce from '../Hooks/useDebounce.jsx';
import {Helmet} from 'react-helmet'
import backgroundImage from '../src/assets/voting.png'
function Login() {
const {name,setName,grade,setGrade,stream,setStream,OTP,setOTP,setIsAuth} = useContext(userContext)
const [searchResults,setSearchResults] = useState([])
const [showClass,setShowClass] = useState(false)
const [showStream,setShowStream] = useState(false)
const [showError,setShowError] = useState(false)
const [errorMessage,setErrorMessage] = useState('')
const [focusInput,setFocusInput] = useState(false)
const [focusClass,setFocusClass] = useState(false)
const [focusStream,setFocusStream] = useState(false)
const [displaySearch,setDisplaySearch] = useState(true)
const [loading,setLoading] = useState(false)
const errorTimerRef = useRef(null)
const navigate = useNavigate()
const searchTerm = useDebounce(name,1000)
useEffect(()=>{
async function getData(){
  const result = await searchStudent(searchTerm)
  if (result.success) {
    setSearchResults(result.data)
  } else {
    setSearchResults([])
  }
}
getData()
},[searchTerm])

function handleInput(e){
  setFocusInput(true)
  setName(e.target.value)
  setDisplaySearch(true)
}


function handleInputClick(){
  setFocusInput(true)
  setFocusStream(false)
  setFocusClass(false)
}


function handleClickClass(){
  setFocusClass(true)
  setFocusInput(false)
  setFocusStream(false)
  setShowStream(false)
  setShowClass((prev)=> !prev)
}
function handleClickStream(){
  setFocusStream(true)
  setFocusInput(false)
  setFocusClass(false)
  setShowClass(false)
  setShowStream((prev)=> !prev)
}



function showErrorMessage(message) {
  if (errorTimerRef.current) {
    clearTimeout(errorTimerRef.current)
  }
  setErrorMessage(message)
  setShowError(true)
  errorTimerRef.current = setTimeout(() => {
    setShowError(false)
  }, 3000)
}

useEffect(() => {
  return () => {
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current)
    }
  }
}, [])

function validateForm() {
  if (grade === '' || name === '' || stream === '' || OTP === '') {
    showErrorMessage('Please fill everything')
    return false
  }
  return true
}

async function checkForStudent(){
  setLoading(true)
  const result = await fetchStudent(name,grade,stream)
  if (!result.success) {
    setLoading(false)
    showErrorMessage('Something went wrong')
    return
  }
  setLoading(false)
  const Student = result.data
  if (Student.querySearchResult.length > 0){
    localStorage.setItem("studentInfo",JSON.stringify({
        name:name,
        class:grade,
        stream:stream
      }))
    if (Student.querySearchResult[0].otp === parseInt(OTP)){
      if (Student.querySearchResult[0].hasVoted){
        showErrorMessage('Student has already voted')
      } else {
        setShowError(false)
        setIsAuth(true)
        navigate('/student/voting-hall')
      }
    } else {
      showErrorMessage('Invalid OTP code try again')
    }
  } else {
    showErrorMessage('Student not found check your details and try again')
  }
}
async function handleSubmit(e){
  e.preventDefault()
  if (!validateForm()) return
  await checkForStudent()
}


  return (
      <div className='flex items-center justify-center flex-col'>
        <div className={`fixed left-4 right-4 top-5 z-50 rounded-md border border-gray-300 bg-white px-4 py-3 text-red-600 shadow-lg ${showError ? 'animate-slide-in-down opacity-100 flex items-center gap-2' : 'flex items-center gap-2 animate-slide-out-up hidden  opacity-0 pointer-events-none'}`} aria-live='assertive'>
            <CircleAlert className='text-red-500'/>
            <p className='text-red-600'>{errorMessage}</p>
        </div>
        <Helmet>
            <title>Student Login</title>
            <meta name="description" content="Login to E-voter as a student and participate in your school's democratic process. Our secure and easy-to-use platform allows you to vote for your school leaders with confidence. Enter your details, including your name, class, stream, and OTP code, to access the voting hall and make your voice heard in shaping the future of your school." />
            <meta name="keywords" content="E-voter student login, secure voting platform, easy-to-use voting system, student voting, school elections, digital voting experience, OTP authentication, democratic process" />
        </Helmet>
        <form 
        onSubmit={handleSubmit} className='dark:bg-[#1E293B] bg-[F9FAFB] backdrop-filter backdrop-blur-xl  shadow-xl p-6 rounded-xl mt-10 space-y-4 sm:w-125 w-[90%] relative border-gray-400 border-1'>
          {/* Background image here */}
          <div className='absolute top-10 right-10'>
            <ThemeIcon/>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <Logo/>
            <h2 className='dark:text-white text-slate-900'>Student Login</h2>
            <h3 className='dark:text-white text-slate-900'>Enter your details to start voting</h3>
          </div>
          <label className='dark:text-white text-slate-900'>Student's Name</label>
          <div className='relative'>
              <input
                onClick={handleInputClick}
                onChange={handleInput} value={name} 
                className={`dark:bg-gray-100  bg-gray-300 text-[#5478FF] rounded-xl placeholder:text-[#5478FF] py-2 pl-2 w-full ${focusInput?'bg-[#5478FF] border-2':'border-1 border-gray-400'}`} placeholder='eg. Mukasa Brian'/>
              <selectContext.Provider value={{setName,setGrade,setStream,setDisplaySearch}}>
                  {
                    displaySearch ? <SearchResults results={searchResults}/>:null
                  }
                  
              </selectContext.Provider>
          </div>
          <label className='dark:text-white text-slate-900'>Class</label>
          <div
          onClick={handleClickClass}
          className={`flex text-[#5478FF] justify-between relative dark:bg-gray-100 bg-gray-300 py-2 pl-2 rounded-xl ${focusClass?'border-[#5478FF] border-2':'border-1 border-gray-400'}`}>
            {grade === '' ? 'Select Class':grade} <ChevronDown/>
            <selectContext.Provider value={{grade,setGrade}}>
                <Dropdown options={['S1','S2','S3','S4','S5','S6']} show={showClass}/>
            </selectContext.Provider>
          </div>
          <label className='dark:text-white text-slate-900'>Stream</label> 
           <div
           onClick={handleClickStream}
            className={`flex  text-[#5478FF] justify-between relative bg-gray-300 dark:bg-gray-100 py-2.5 pl-2 rounded-xl ${focusStream?'border-[#5478FF] border-2':'border-1 border-gray-400'}`}>
             {stream === '' ? 'Select Stream':stream} <ChevronDown/>
             <selectContext.Provider value={{stream,setStream}}>
                <Dropdown options={['A','B','C','D']} form6={['Arts','Physicals','Biologicals']} show={showStream} grade={grade}/>
             </selectContext.Provider>
          </div>
          <label className='dark:text-white text-slate-900'>Enter your OTP</label>
          <input type="text" value={OTP} onChange={(e) => setOTP(e.target.value)} className={`bg-gray-300 border placeholder:text-[#5478FF] border-gray-400 dark:bg-gray-100 text-[#5478FF] rounded-xl py-2 pl-2 w-full ${focusInput?'bg-[#5478FF] border-2':''}`} placeholder='Enter your otp here' />
           <button type='submit' className='text-white mt-6 py-2.5 bg-[#5478FF] w-full mx-auto rounded-xl cursor-pointer flex justify-center gap-2 hover:opacity-80 shadow-md'>
             {loading ? 'Verifying Info ...' : 'Enter Voting Hall'}
             {loading ? null: <LogIn color='white'/>}
           </button>
           <div className='text-center dark:text-white text-slate-900'>
              <Link to='/admin/auth/login' className=' underline'>Am an administrator</Link> OR <Link to='/auth/login/Staff' className='underline'>Am a Staff member</Link>   
           </div>
        </form>
      </div>
  )
}

export default Login
