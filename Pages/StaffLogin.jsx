import {User}  from 'lucide-react'
import ThemeIcon from '../Components/ThemeIcon'
function StaffLogin(){
    return(
        <div className="h-screen flex items-center justify-center">
            <div className='space-y-5 flex flex-col items-center dark:bg-[#1E293B] bg-[F9FAFB] shadow-xl p-6 rounded-xl sm:w-125 relative w-[90%]'>
                <div className='absolute top-10 right-10'>
                    <ThemeIcon/>
                </div>
                <h2 className='text-white text-3xl text-center'>Staff Login</h2>
                <div className='bg-[#5478FF] p-5  flex items-center justify-center rounded-full'>
                    <User color='white' size={60}/>
                </div>
                <div className='flex flex-col space-y-5 w-full'>
                    <h2 className='dark:text-white text-slate-900'>
                        Staff Name
                    </h2>
                    <input className='bg-gray-100 py-2.5 pl-2 rounded-xl w-full' type="text" placeholder='Name' />
                    <h2 className='dark:text-white text-slate-900'>
                        Enter your OTP
                    </h2>
                    <input className='bg-gray-100 py-2.5 pl-2 rounded-xl w-full' type="password" placeholder='Enter your OTP' />
                </div>
                <button className='text-white mt-6 py-2.5 bg-[#5478FF] w-full mx-auto rounded-xl cursor-pointer hover:opacity-80'>
                    Login
                </button>
            </div>
        </div>
    )
}

export default StaffLogin