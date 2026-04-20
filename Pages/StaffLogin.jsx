import {User}  from 'lucide-react'

function StaffLogin(){
    return(
        <div className="h-screen flex items-center justify-center">
            <div className='space-y-5 flex flex-col items-center bg-[#1E293B] shadow-xl p-6 rounded-xl sm:w-[500px] w-[90%]'>
                <h2 className='text-white text-3xl text-center'>Staff Login</h2>
                <div className='bg-[#5478FF] p-5  flex items-center justify-center rounded-full'>
                    <User color='white' size={60}/>
                </div>
                <div className='flex flex-col space-y-5 w-full'>
                    <h2 className='text-white'>
                        Name
                    </h2>
                    <input className='bg-gray-100 py-2.5 pl-2 rounded-xl w-full' type="text" placeholder='Name' />
                    <h2 className='text-white'>
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