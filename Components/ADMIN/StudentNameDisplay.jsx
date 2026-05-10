import { UserIcon } from "lucide-react"
function StudentNameDisplay({Name,Class,Stream,OTP,hasVoted,highLightOtps}) {
  return (
    <div className='w-full text-slate-900 dark:text-white cursor-pointer bg-white dark:bg-[#1E293B] shadow-md hover:shadow-xl transition-all duration-200 ease-out transform-gpu hover:-translate-y-0.5 hover:scale-[1.01] text-left flex justify-around items-center overflow-scroll hide-scrollbar gap-10 py-8 px-8 my-4 rounded-lg mr-4'>
        <div className="bg-[#5478FF] rounded-full p-4">
            <UserIcon color="white"/>
        </div>
        <p>{Name}</p>
        <p className="align-left">Class {Class}</p>
        <p>Stream {Stream}</p>
        <p className={`${highLightOtps ? 'bg-green-400 text-white p-2 rounded-md':''}`}>OTP {OTP}</p>
        <p>hasVoted {hasVoted ? 'Yes':'No'}</p>
    </div>
  )
}

export default StudentNameDisplay