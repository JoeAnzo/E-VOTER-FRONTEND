import React from 'react'

function CandidateDetails({details}) {
  return (
    <div className='text-slate-900 dark:text-white cursor-pointer bg-white dark:bg-[#1E293B] shadow-md hover:shadow-xl transition-all duration-200 ease-out transform-gpu hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-[#5478FF] hover:text-white text-left flex justify-around items-center gap-20 py-4 px-8 my-4 rounded-lg mr-4'>
        <div>
            <img className='h-[200px] w-[150px] sm:w-[200px] rounded-md object-cover object-center' src={details.photo_URL}/>
        </div>
        <p>{details.Candidate_Name}</p>
        <p>{details.Class}</p>
        <p>{details.Stream}</p>
        <p>{details.education_Level}</p>
        <p>{details.prefectorial_Post}</p>
    </div>
  )
}

export default CandidateDetails