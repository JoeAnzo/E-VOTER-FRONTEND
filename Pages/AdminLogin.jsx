import {User}  from 'lucide-react'
import { getAdminUser } from '../Services/ApiCalls.js'
import {EyeIcon,EyeClosed} from 'lucide-react'
import { useState } from 'react'
function AdminLogin(){

    const [adminUserDetails,setAdminUserDetails] = useState({Username:'',password:''})
    const [error,setError] = useState({error:false,errorMessage:''})
    const [showPassword,setShowPassword] = useState(false)
    const [focusInput,setFocusInput] = useState({
        focusAdminUserNameInput:false,
        focusAdminPasswordInput:false
    })

    function checkForFormErrors(){
        if (adminUserDetails.Username === '' || adminUserDetails.password === ''){
            setError((prev) => {
                return {
                    ...prev,
                    error:true,
                    errorMessage:'Please fill all the details'
                }
            })
        }
    }

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
        checkForFormErrors()
        const adminUser = await getAdminUser(adminUserDetails.Username,adminUserDetails.password)
        console.log(adminUser)
    }

    function togglePasswordIcon(){
        setShowPassword((prev) => !prev)
    }

    return(
        <div className="h-screen flex items-center justify-center">
            <div className='space-y-5 flex flex-col items-center bg-[#101540] shadow-xl p-6 rounded-xl sm:w-[500px] w-[90%]'>
                <h2 className='text-white text-3xl text-center'>Admin Login</h2>
                <div className='bg-[#5478FF] p-5  flex items-center justify-center rounded-full'>
                    <User color='white' size={60}/>
                </div>
                <div className='flex flex-col space-y-5 w-full'>
                    <h2 className='text-white'>User Name</h2>
                    <input type='text' placeholder='User name' value={adminUserDetails.Username} onChange={handleUserName} className={`${focusInput.focusAdminUserNameInput ? 'border-2 border-[#5478FF]':''} bg-gray-100 py-2.5 pl-2 rounded-xl w-full`}/>
                    <h2 className='text-white'>Password</h2>
                    <div className='flex gap-4 justify-center items-center'>
                        <input type={`${showPassword ? 'text':'password'}`} placeholder='password' value={adminUserDetails.password} onChange={handlePassword} className={`${focusInput.focusAdminPasswordInput ? 'border-2 border-[#5478FF]':''} bg-gray-100 py-2.5 pl-2 rounded-xl w-full`} />
                        <div onClick={togglePasswordIcon}>
                            {
                                showPassword ? <EyeIcon  color='white' size={30}/>:<EyeClosed size={30} color='white'/>
                            }
                        </div>
                    </div>
                </div>
                {
                    error.error ? <p className='text-center text-red-700'>{error.errorMessage}</p> : null
                }
                <button onClick={handleLoginClick} className='text-white mt-6 py-2.5 bg-[#5478FF] w-full mx-auto rounded-xl cursor-pointer hover:opacity-80'>
                    Login
                </button>
            </div>
        </div>
    )
}

export default AdminLogin