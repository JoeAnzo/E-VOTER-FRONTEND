import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from './Header'
import {Link, Navigate, replace} from 'react-router-dom'
import { ChevronDown,User,CircleCheckBig } from 'lucide-react';
import { userContext } from '../src/App';
function Login() {
const [showClasses,setShowClasses] = useState(false)
const [showStreams,setShowStreams] = useState(false)
const [nameError,setNameError] = useState(null)
const [streamError,setStreamError] = useState(false)
const [classError,setClassError] = useState(false)
const [name,setName] = useState('')
const [stream,setStream] = useState('Stream')
const [grade,setGrade] = useState('Class')
const [isAuth,setisAuth] = useState(null)
const {role} = useContext(userContext)
const classes = useRef()
const streams = useRef()
const inputElement = useRef()
const classElment = useRef()
useEffect(()=>{
  const stream = streams.current.querySelectorAll('h2')
  stream.forEach((s)=>s.addEventListener('click',handleSelectStream))
  const classe = classes.current.querySelectorAll('h2')
  classe.forEach((c)=>{c.addEventListener('click',handleSelectClass)})
},[])
useEffect(()=>{
  if (grade !== 'Class' && grade !== 'Enter Your Class'){
    setClassError(false)
  }
},[grade])
useEffect(()=>{
   if (stream !== 'Stream' &&  stream !== 'Enter Your Stream'){
    setStreamError(false)
  }
},[stream])
useEffect(()=>{
  if (name !== ''){
    setNameError(false)
  }
},[name])
function handleSelectStream(e){
  setStream(e.target.innerText)
}
function handleSelectClass(e){
  setGrade(e.target.innerText)
}
function handleClass(){
  setShowClasses((prev)=>!prev)
  if (showStreams){
    setShowStreams(false)
  }
}
function handleStreams(){
  setShowStreams((prev) => !prev)
}
function handleInput(e){
  setName(e.target.value)
}
async function handleSubmit(e){
  errorHandler()
  e.preventDefault()
  const base_url = 'http://localhost:3000'
  try {
    const res = await fetch(`${base_url}/student?name=${name}&grade=${grade}&stream=${stream}`)
    const data = await res.json()
    console.log(data)
    if (data){
      setisAuth(true)
    }
    if (data.length === 0){
      setisAuth(false)
    }
    if (isAuth){
      return <Navigate to="/prefects" replace/>
    }
  } catch (error) {
    console.log(error.message)
  }
}
function errorHandler(){
  if (name === ''){
      setNameError(true)
      inputElement.current.placeholder = 'Please Enter Your Name'
    }
  if (grade === 'Class'){
      setClassError(true)
      setGrade('Enter Your Class')
      console.log(classError)
    }
  if (stream === 'Stream'){
      setStreamError(true)
      setStream('Enter Your Stream')
      console.log(streamError)
    }
}
  return (
    <div className='min-h-fit'>
      <Header/>
      <div className='background flex items-center justify-center flex-col h-screen'>
        <form onSubmit={handleSubmit} className='form w-full h-full justify-center  gap-10 flex flex-col px-[1em] sm:px-[5em] rounded:lg'>
          <User size={150} color='white' className='mx-auto bg-blue-500 p-5 rounded-full'/>
          <input ref={inputElement} onChange={handleInput} value={name} className={`${nameError ? 'border-red-700 placeholder-red-700':''} py-4 bg-white outline-0 pl-4`}  type="text" placeholder="Student's name"/>
          <div 
          ref={classElment}
          onClick={handleClass} 
          className={`bg-white ${classError ? 'text-red-700':'text-gray-500'} py-4 px-4 flex justify-between cursor-pointer relative`}>
            {grade} <ChevronDown/>
            <div ref={classes} className={`bg-blue-500 absolute z-20 top-full right-0 left-0 text-white pl-4 py-4 cursor-pointer ${showClasses ? null : 'hidden'}`}>
            <h2>S1</h2>
            <h2>S2</h2>
            <h2>S3</h2>
            <h2>S4</h2>
            <h2>S6</h2>
             </div>
          </div>
          <div
          onClick={handleStreams} 
          className={`bg-white relative px-4 py-4 flex justify-between cursor-pointer ${streamError ? 'text-red-700':'text-gray-500'}`}>
            {stream} <ChevronDown/>
            <div
            ref={streams} 
           className={`bg-blue-500 absolute top-full left-0 right-0 text-white pl-4 py-4 cursor-pointer transition-[.3] ${showStreams ? null : 'hidden'}`}>
              <h2>A</h2>
              <h2>B</h2>
              <h2>C</h2>
              <h2>D</h2>
            </div>
          </div>
           <div>
              {
                isAuth === null ? null : isAuth === true ? <h2 className='text-green-600 font-700 text-center flex items-center gap-2 justify-center'>Authenticated successfully<CircleCheckBig color='oklch(62.7% 0.194 149.214) '/></h2> : <h2 className='text-red-600 text-center font-extrabold'>Something went wrong</h2>
              }
           </div>
           <button type='submit' className='text-white mt-6 py-4 bg-blue-500 w-full sm:w-[30%] mx-auto rounded-xl cursor-pointer hover:opacity-80'>
             Login
           </button>
        </form>
      </div>
    </div>
  )
}

export default Login
