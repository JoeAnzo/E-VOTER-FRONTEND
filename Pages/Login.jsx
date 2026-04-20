import React, { useContext,useEffect,useState } from 'react'
import {Navigate, useNavigate,Link} from 'react-router-dom'
import { ChevronDown,User,CircleCheckBig } from 'lucide-react';
import Dropdown from '../Components/DropDown.jsx'
import SearchResults from '../Components/SearchResults.jsx';
import Logo from '../Components/Logo.jsx';
import { selectContext } from '../Contexts/selectContext.js';
import { userContext } from '../Contexts/userContext.js';
import {searchStudent,fetchStudent} from '../Services/ApiCalls.js';
import useDebounce from '../Hooks/useDebounce.jsx';
function Login() {
const {name,setName,grade,setGrade,stream,setStream,OTP,setOTP,setIsAuth} = useContext(userContext)
const [searchResults,setSearchResults] = useState([])
const [showClass,setShowClass] = useState(false)
const [showStream,setShowStream] = useState(false)
const [error,setError] = useState(false)
const [errorMessage,setErrorMessage] = useState('')
const [focusInput,setFocusInput] = useState(false)
const [focusClass,setFocusClass] = useState(false)
const [focusStream,setFocusStream] = useState(false)
const [displaySearch,setDisplaySearch] = useState(true)
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
function errorhandler(){
  if (grade===''||name===''||stream===''||OTP===''){
    setError(true)
    setErrorMessage('Please fill everything')
  } else {
    setError(false)
  }
}
async function checkForStudent(){
  const result = await fetchStudent(name,grade,stream)
  if (!result.success) {
    setError(true)
    setErrorMessage('Something went wrong')
    return
  }
  const Student = result.data
  if (Student.querySearchResult.length > 0){
    localStorage.setItem("studentInfo",JSON.stringify({
        name:name,
        class:grade,
        stream:stream
      }))
    if (Student.querySearchResult[0].otp === parseInt(OTP)){
      setIsAuth(true)
      setError(false)
      navigate('/student/voting-hall')
    } else {
      setError(true)
      setErrorMessage('Invalid OTP code try again')
    }
  } else {
    setError(true)
    setErrorMessage('Student not found check your details and try again')
  }
}
async function handleSubmit(e){
  e.preventDefault()
  errorhandler()
  await checkForStudent() 
}


  return (
      <div className='flex items-center justify-center flex-col h-screen  bg-[#0F172A] shadow-2xl'>
        <form 
        onSubmit={handleSubmit} className='bg-[#1E293B] shadow-xl p-6 rounded-xl mt-10 space-y-4 sm:w-125 w-[90%]'>
          <div className="flex flex-col justify-center items-center space-y-2">
            <Logo/>
            <h1 className='text-white'>Student Login</h1>
            <p className='text-white'>Enter your details to start voting</p>
          </div>
          <h2 className='text-white'>Student's Name</h2>
          <div className='relative'>
              <input
                onClick={handleInputClick} 
                onChange={handleInput} value={name} 
                className={`bg-gray-100 text-[#5478FF] rounded-xl py-2.5 pl-2 w-full ${focusInput?'bg-[#5478FF] border-2':''}`} placeholder='eg. Mukasa Brian'/>
              <selectContext.Provider value={{setName,setGrade,setStream,setDisplaySearch}}>
                  {
                    displaySearch ? <SearchResults results={searchResults}/>:null
                  }
                  
              </selectContext.Provider>
          </div>
          <h2 className='text-white'>Class</h2>
          <div
          onClick={handleClickClass}
          className={`flex text-[#5478FF] justify-between relative bg-gray-100 py-2.5 pl-2 rounded-xl ${focusClass?'border-[#5478FF] border-2':''}`}>
            {grade === '' ? 'Select Class':grade} <ChevronDown/>
            <selectContext.Provider value={{grade,setGrade}}>
                <Dropdown options={['S1','S2','S3','S4','S5','S6']} show={showClass}/>
            </selectContext.Provider>
          </div>
          <h2 className='text-white'>Stream</h2> 
           <div
           onClick={handleClickStream}
            className={`flex text-[#5478FF] justify-between relative bg-gray-100 py-2.5 pl-2 rounded-xl ${focusStream?'border-[#5478FF] border-2':''}`}>
             {stream === '' ? 'Select Stream':stream} <ChevronDown/>
             <selectContext.Provider value={{stream,setStream}}>
                <Dropdown options={['A','B','C','D']} form6={['Arts','Physicals','Biologicals']} show={showStream} grade={grade}/>
             </selectContext.Provider>
          </div>
          <h2 className='text-white'>Enter your OTP</h2>
          <input type="text" value={OTP} onChange={(e) => setOTP(e.target.value)} className={`bg-gray-100 text-[#5478FF] rounded-xl py-2.5 pl-2 w-full ${focusInput?'bg-[#5478FF] border-2':''}`} placeholder='Enter your otp here' />
          <p className='text-center text-red-700'>
            {
              error ? errorMessage : ''
            }
          </p>
           <button onClick={checkForStudent} type='submit' className='text-white mt-6 py-2.5 bg-[#5478FF] w-full mx-auto rounded-xl cursor-pointer hover:opacity-80'>
             Enter Voting Hall
           </button>
           <div className='text-center text-white'>
              <Link to='/admin/auth/login' className='text-white underline'>Am an administrator</Link> OR <Link to='/auth/login/Staff' className='text-white underline'>Am a Staff member</Link>   
           </div>
        </form>
      </div>
  )
}

export default Login
