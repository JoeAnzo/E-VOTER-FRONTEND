import React, { useContext,useEffect, useState } from "react";
import { userContext } from "../Contexts/userContext.js";
import useInView from '../Hooks/useInView.jsx'

function PrefectCard(
    {
    
    candidate,
    showErrorMessage,
    index,
    votedForCandidatesCurrentPost,
    setVotedForCandidatesCurrentPost,
    setALEVELCandidate,
    setOLEVELCandidate
    }
){
    
    const [ref,isVisible] = useInView({
        threshold:0.5
    })

    // Check if this specific candidate was voted for
    const isChecked = votedForCandidatesCurrentPost.some((votedCandidate) => {
        return votedCandidate.Candidate_Name === candidate.Candidate_Name &&
               votedCandidate.prefectorial_Post === candidate.prefectorial_Post &&
               votedCandidate.education_Level === candidate.education_Level
    })

    
    
    function handleClick(candidate){
        
        // Check if student has already voted for this post and education level
        const hasAlreadyVotedForThisPost = votedForCandidatesCurrentPost.some((votedCandidate) => {
            return votedCandidate.prefectorial_Post === candidate.prefectorial_Post &&
                   votedCandidate.education_Level === candidate.education_Level
        })

        // If already voted for this position and education level, prevent voting again
        if (hasAlreadyVotedForThisPost) {
            showErrorMessage(`You have already voted for ${candidate.prefectorial_Post} (${candidate.education_Level}).`)
            return
        }

        // Add vote to the list
        setVotedForCandidatesCurrentPost((prev) => [...prev, {
            Candidate_Name: candidate.Candidate_Name,
            education_Level: candidate.education_Level,
            prefectorial_Post: candidate.prefectorial_Post
        }])

        // Update the candidate name display
        if (candidate.education_Level === 'A-Level' || candidate.education_Level === 'A Level'){
            setALEVELCandidate(candidate.Candidate_Name)
        } else {
            setOLEVELCandidate(candidate.Candidate_Name)
        }
    }

    

    return(
        <>
        <div ref={ref} onClick={() => handleClick(candidate)} style={{
            transform: isVisible ? 'translateX(0) translateY(0)' : 'translateX(-5rem) translateY(2rem)',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 500ms ease-out, transform 500ms ease-out',
            transitionDelay: `${index * 0.15}s`,
            willChange: 'opacity, transform'
          }} className={`flex w-[98%] sm:w-125 pr-2 text-slate-900 dark:text-white items-center backdrop-filter backdrop-blur-xl hover:cursor-pointer justify-between bg-[F9FAFB] dark:bg-[#1E293B]/30 rounded-md ${(isChecked) ? 'border-2 border-[#5478FF] shadow-[inset_0_0_15px_rgba(84,120,255,0.2)]':'border border-gray-400'}`}>
            <img className='w-30 h-40 rounded-md object-cover object-top anti' src={candidate.photo_URL} alt={candidate.Candidate_Name} />
            <div>
                <p className="text-sm">{candidate.Candidate_Name}</p>
                <p className="text-sm">{candidate.education_Level}</p>
                <p className="text-sm">{candidate.Class} {candidate.Stream}</p>
            </div>
            <div className="flex text-md items-center gap-2">
                 <p className="text-sm">{isChecked ? 'Voted':'vote'}</p>
                <input className="w-5 h-5 rounded-full  text-blue-600 focus:ring-blue-500/30 accent-[#5478FF]" type='checkbox' checked={isChecked}/>
            </div>          
        </div>
        </>
    )
}

export default PrefectCard