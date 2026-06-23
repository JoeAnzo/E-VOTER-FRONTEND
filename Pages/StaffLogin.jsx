import {User,CircleCheckBig,LogIn,CircleAlert}  from 'lucide-react'
import ThemeIcon from '../Components/ThemeIcon'
import {useEffect, useState,useRef} from 'react'
import {getAuth,signInWithPhoneNumber,RecaptchaVerifier} from 'firebase/auth'
import useDebounce from '../Hooks/useDebounce'
import { searchStaff } from '../Services/ApiCalls'
import SearchResults from '../Components/SearchResults.jsx';
import StaffSearchResults from '../Components/StaffSearchResults.jsx'
import { auth } from '../config/firebase.js'

function StaffLogin(){
    const [hasReceivedOTP,setHasReceivedOTP] = useState(false)
    const [staffName,setStaffName] = useState('')
    const [OTP,setOTP] = useState('')
    const [confirmationResult,setConfirmationResult] = useState(null)
    const [digits,setDigits] = useState('')
    const [searchResults,setSearchResults] = useState([])
    const [showError,setShowError] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    const [showResults,setShowResults] = useState(false)
    const errorTimerRef = useRef(null)
    const searchTerm = useDebounce(staffName,1000)

    function handleClick(){
        if (staffName === '' || digits === ''){
            showErrorMessage('Please fill in everything!')
        }
        if (!hasReceivedOTP){
            if (digits.length > 10){
                generateRecaptcha()
                let appVerifier = window.RecaptchaVerifier
                signInWithPhoneNumber(auth,digits,appVerifier)
                .then((confirmationResult) => {
                    console.log(confirmationResult)
                    setConfirmationResult(confirmationResult)
                    alert("OTP has been sent to your phone number")
                    setHasReceivedOTP(true)
                })
                .catch((error) => {
                    console.error(error)
                    setErrorMessage('OTP has not been sent')
                    setHasReceivedOTP(false)
                })
            } else {
                setErrorMessage('Please a valid phone number with country code')
            }
        } else {
            if (OTP.length === 6){
                confirmationResult.confirm(OTP)
                .then((result) => {
                    const user = result.user
                    //continue from here cos successfull login
                })
                .catch((error) => {
                    setErrorMessage('Invalid OTP Code')
                })
            } else {
                showErrorMessage('Please enter a 6 digit OTP code')
            }
        }
    }

    function handleInput(e){
        setShowResults(true)
        setStaffName(e.target.value)
    }

    function generateRecaptcha(){
        window.RecaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container',{
            'size':'invisible',
            'callback': (response) => {

            }
        })
    }


    useEffect(() => {
        async function getData(){
            const results = await searchStaff(staffName)
            if (results.success){
                setSearchResults(results.data.StaffMembers)
                
            }
            console.log(searchResults)
        }
        getData()
    },[searchTerm])

    useEffect(() => {
      return () => {
        if (errorTimerRef.current) {
          clearTimeout(errorTimerRef.current)
        }
      }
    }, [])


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
    return(
        <div className="h-screen flex items-center justify-center">
            <div className={`fixed left-4 right-4 top-5 z-50 rounded-md border border-gray-300 bg-white px-4 py-3 text-red-600 shadow-lg ${showError ? 'animate-slide-in-down opacity-100 flex items-center gap-2' : 'flex items-center gap-2 animate-slide-out-up hidden  opacity-0 pointer-events-none'}`} aria-live='assertive'>
                <CircleAlert className='text-red-500'/>
                <p className='text-red-600'>{errorMessage}</p>
            </div>
            <div className='space-y-5 flex flex-col border border-gray-400 items-center dark:bg-[#1E293B]/30 bg-[F9FAFB]/30 backdrop-filter backdrop-blur-xl  shadow-xl p-6 rounded-xl sm:w-125 relative w-[90%]'>
                <div className='absolute top-5 right-5'>
                    <ThemeIcon/>
                </div>
                <h2 className='dark:text-white text-slate-900 text-3xl text-center'>Staff Login</h2>
                <div className='bg-[#5478FF] p-5  flex items-center justify-center rounded-full'>
                    <User color='white' size={60}/>
                </div>
                <div className='flex flex-col w-full gap-4'>
                    <div className="space-y-2 relative">
                        <label className='dark:text-white text-slate-900'>
                            Staff UserName
                        </label>
                        <input className='bg-gray-100 border border-gray-400 py-2.5 pl-2 rounded-xl w-full' type="text" placeholder='Name'value={staffName} onChange={handleInput}/>
                        {
                            showResults ? <StaffSearchResults setStaffName={setStaffName} results={searchResults} setShowResults={setShowResults}/>:null
                        }
                    </div>
                    <div>
                        {
                        hasReceivedOTP ?
                        <div className=''>
                            <label className='dark:text-white text-slate-900 my-2'>
                                Enter your OTP
                            </label>
                            <input className='bg-gray-100 border border-gray-400 py-2.5 pl-2 rounded-xl w-full' type="number" placeholder='Enter your OTP' value={OTP} onChange={(e) => setOTP(e.target.value)}/>
                        </div> :
                        <div className='space-y-2'>
                            <label className='dark:text-white text-slate-900 '>
                                Enter your Telephone Number
                            </label>
                            <input className='bg-gray-100 py-2.5 pl-2 rounded-xl w-full' type="tel" placeholder='eg +256778714390' value={digits} onChange={(e) => setDigits(e.target.value)}/>
                        </div>
                        }
                    </div>
                </div>
                <button onClick={handleClick} className='text-white mt-6 py-2.5 bg-[#5478FF] w-full mx-auto rounded-xl cursor-pointer hover:opacity-80'>
                    {hasReceivedOTP ? 'Login' : 'Request OTP'}
                </button>
            </div>
            <div id="recaptcha-container"></div>
        </div>
    )
}

export default StaffLogin