import React from 'react'
import Staff from '../../Pages/ADMIN/Staff'
import { UserIcon } from 'lucide-react'

function StaffMemberDetailsCard({staffDetails}) {
    console.log(staffDetails)
  return (
    <div className='w-full text-slate-900 dark:text-white cursor-pointer bg-white dark:bg-[#1E293B] shadow-md hover:shadow-xl transition-all duration-200 ease-out transform-gpu hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-[#5478FF] hover:text-white text-left flex justify-around items-center gap-20 py-8 px-8 my-4 rounded-lg mr-4'>
        <div className="bg-[#5478FF] rounded-full p-4">
            <UserIcon color="white"/>
        </div>
        <p>{staffDetails.Name}</p>
        <p>Department {staffDetails.Department}</p>
        <p>OTP {staffDetails.otp}</p>
        <p>hasVoted {staffDetails.hasVoted ? 'Yes':'No'}</p>
    </div>
  )
}

export default StaffMemberDetailsCard