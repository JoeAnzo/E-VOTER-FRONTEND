import React from 'react'

function CandidateDetails({details}) {
  return (
    <div className='text-white hover:cursor-pointer transition-all transition-ease hover:-translate-y-2 duration-500 hover:bg-[#5478FF] text-left flex justify-around items-center gap-20 py-4 bg-[#1E293B] px-8 my-4 rounded-lg mr-4'>
        <div>
            <img className='h-50 w-37.5 sm:w-50 rounded-md object-cover object-center' src={details.photo_URL}/>
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