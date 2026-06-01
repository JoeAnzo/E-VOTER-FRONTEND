import {User}  from 'lucide-react'
import ThemeIcon from '../Components/ThemeIcon'
import {useState} from 'react'
function StaffLogin(){
    const [hasReceivedOTP,setHasReceivedOTP] = useState(false)
    const [staffName,setStaffName] = useState('')
    const [OTP,setOTP] = useState(0)
    const [digits,setDigits] = useState(0)

    return(
        <div className="h-screen flex items-center justify-center">
            <div className='space-y-5 flex flex-col border-1 border-gray-400 items-center dark:bg-[#1E293B]/30 bg-[F9FAFB]/30 backdrop-filter backdrop-blur-xl  shadow-xl p-6 rounded-xl sm:w-125 relative w-[90%]'>
                <div className='absolute top-5 right-5'>
                    <ThemeIcon/>
                </div>
                <h2 className='dark:text-white text-slate-900 text-3xl text-center'>Staff Login</h2>
                <div className='bg-[#5478FF] p-5  flex items-center justify-center rounded-full'>
                    <User color='white' size={60}/>
                </div>
                <div className='flex flex-col w-full gap-4'>
                    <div className="space-y-2">
                        <label className='dark:text-white text-slate-900'>
                            Staff UserName
                        </label>
                        <input className='bg-gray-100 border-1 border-gray-400 py-2.5 pl-2 rounded-xl w-full' type="text" placeholder='Name'value={staffName} onChange={(e) => setStaffName(e.target.value)}/>
                    </div>
                    <div>
                        {
                        hasReceivedOTP ?
                        <div className=''>
                            <label className='dark:text-white text-slate-900 my-2'>
                                Enter your OTP
                            </label>
                            <input className='bg-gray-100 border-1 border-gray-400 py-2.5 pl-2 rounded-xl w-full' type="number" placeholder='Enter your OTP' value={OTP} onChange={(e) => setOTP(e.target.value)}/>
                        </div> :
                        <div className='space-y-2'>
                            <label className='dark:text-white text-slate-900 '>
                                Enter your Telephone Number
                            </label>
                            <input className='bg-gray-100 py-2.5 pl-2 rounded-xl w-full' type="number" placeholder='eg +256778714390' value={digits} onChange={(e) => setDigits(e.target.value)}/>
                        </div>
                        }
                    </div>
                </div>
                <button className='text-white mt-6 py-2.5 bg-[#5478FF] w-full mx-auto rounded-xl cursor-pointer hover:opacity-80'>
                    {hasReceivedOTP ? 'Login' : 'Request OTP'}
                </button>
            </div>
        </div>
    )
}

export default StaffLogin