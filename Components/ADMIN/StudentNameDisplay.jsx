import { UserIcon } from "lucide-react"
function StudentNameDisplay({Name,Class,Stream,OTP,hasVoted}) {
  return (
    <div className='text-white hover:cursor-pointer transition-all transition-ease hover:-translate-y-2 duration-500 hover:bg-[#5478FF] text-left flex justify-around items-center gap-20 py-8 bg-[#1E293B] px-8 my-4 rounded-lg mr-4'>
        <div className="bg-[#5478FF] rounded-full p-4">
            <UserIcon color="white"/>
        </div>
        <p>{Name}</p>
        <p className="align-left">Class {Class}</p>
        <p>Stream {Stream}</p>
        <p>OTP {OTP}</p>
        <p>hasVoted {hasVoted ? 'Yes':'No'}</p>
    </div>
  )
}

export default StudentNameDisplay