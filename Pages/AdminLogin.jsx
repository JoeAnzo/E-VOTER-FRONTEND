import { userContext } from '../Contexts/userContext.js'
import { useContext, useState,useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {User}  from 'lucide-react'
import { getAdminUser } from '../Services/ApiCalls.js'
import {EyeIcon,EyeClosed,CircleAlert} from 'lucide-react'
import ThemeIcon from '../Components/ThemeIcon.jsx'
import {Helmet} from 'react-helmet'
function AdminLogin(){

    const {setIsAuth} = useContext(userContext)
    const [adminUserDetails,setAdminUserDetails] = useState({Username:'',password:''})
    const [error,setError] = useState({error:false,errorMessage:''})
    const [showPassword,setShowPassword] = useState(false)
    const errorTimerRef = useRef(null)
    
    const [focusInput,setFocusInput] = useState({
        focusAdminUserNameInput:false,
        focusAdminPasswordInput:false
    })
    const navigate = useNavigate()


    function handleUserName(e){
        setAdminUserDetails(
            (prev) => {
                return {
                    ...prev,
                    Username:e.target.value
                }
            }
        )
        setFocusInput((prev) => {
            return {
                ...prev,
                focusAdminUserNameInput:true,
                focusAdminPasswordInput:false
            }
        })
    }

    function handlePassword(e){
        setAdminUserDetails(
            (prev) => {
                return {
                    ...prev,
                    password:e.target.value
                }
            }
        )
         setFocusInput((prev) => {
            return {
                ...prev,
                focusAdminPasswordInput:true,
                focusAdminUserNameInput:false
            }
        })
    }

    async function handleLoginClick(){
      if (adminUserDetails.Username === '' || adminUserDetails.password === ''){
            showErrorMessage('Please fill in all the details !')
        }
        else {
            const result = await getAdminUser(adminUserDetails.Username,adminUserDetails.password)
            console.log(result)
            if (result.success) {
                const adminUser = result.data
                 if (adminUser?.adminUser){
                    setIsAuth(true)
                    navigate("/admin/dashboard")
                } else if (!adminUser.adminUser) {
                    showErrorMessage(adminUser.message)
                }
            } else {
                showErrorMessage('Something went wrong !')
            }
        }
        
    }

    function togglePasswordIcon(){
        setShowPassword((prev) => !prev)
    }

    function showErrorMessage(message) {
        if (errorTimerRef.current) {
            clearTimeout(errorTimerRef.current)
            setError((prev)=>{
                return {
                    ...prev,
                    error:true,
                    errorMessage:message
                    }
                })
        }
        
        errorTimerRef.current = setTimeout(() => {
        setError((prev)=>{
                return {
                    ...prev,
                    error:false
                    }
                })
  }, 3000)
}



    useEffect(() => {
      return () => {
        if (errorTimerRef.current) {
          clearTimeout(errorTimerRef.current)
        }
      }
    }, [])
    return(
        <div className="h-screen flex items-center justify-center">
            <div className={`fixed left-4 right-4 top-5 z-50 rounded-md border border-gray-300 bg-white px-4 py-3 text-red-600 shadow-lg ${error.error ? 'animate-slide-in-down opacity-100 flex items-center gap-2' : 'flex items-center gap-2 animate-slide-out-up hidden  opacity-0 pointer-events-none'}`} aria-live='assertive'>
                <CircleAlert className='text-red-500'/>
                <p className='text-red-600'>{error.errorMessage}</p>
            </div>
            <Helmet>
                <title>Admin Login</title>
                <meta name="description" content="Secure admin login for the E-voter platform. Access your school's election management dashboard to oversee and manage the election process with ease." />
                <meta name="keywords" content="E-voter, admin login, secure login, school elections, election management dashboard" />
            </Helmet>
            <div className='space-y-5 border-1 border-gray-400 flex flex-col items-center dark:bg-[#1E293B]/30 bg-[F9FAFB]/30 backdrop-filter backdrop-blur-xl shadow-xl p-6 rounded-xl sm:w-125 w-[90%] relative'>
                <h2 className='dark:text-white text-slate-900 text-3xl text-center'>Admin Login</h2>
                <div className='bg-[#5478FF] p-5  flex items-center justify-center rounded-full'>
                    <div className='absolute top-5 right-3'>
                        <ThemeIcon/>
                    </div>
                    <User color='white' size={60}/>
                </div>
                <div className='flex flex-col w-full'>
                    <label className='dark:text-white text-slate-900 my-2'>User Name</label>
                    <input type='text' placeholder='Username' value={adminUserDetails.Username} onChange={handleUserName} className={`${focusInput.focusAdminUserNameInput ? 'border-2 border-[#5478FF]':'border-1 border-gray-400'} bg-gray-100 py-2.5 pl-2 rounded-xl w-full`}/>
                    <label className='dark:text-white text-slate-900 my-2'>Password</label>
                    <div className='flex relative justify-center items-center'>
                        <input type={`${showPassword ? 'text':'password'}`} placeholder='password' value={adminUserDetails.password} onChange={handlePassword} className={`${focusInput.focusAdminPasswordInput ? 'border-2 border-[#5478FF]':'border-1 border-gray-400'} bg-gray-100 py-2.5 pl-2 rounded-xl w-full`} />
                        <div className='absolute right-2' onClick={togglePasswordIcon}>
                            {
                                showPassword ? <EyeIcon  color='#5478FF' size={30}/>:<EyeClosed size={30} color='#5478FF'/>
                            }
                        </div>
                    </div>
                </div>
                <button onClick={handleLoginClick} className='text-white mt-6 py-2.5 bg-[#5478FF] w-full mx-auto rounded-xl cursor-pointer hover:opacity-80'>
                    Login
                </button>
            </div>
        </div>
    )
}

export default AdminLogin