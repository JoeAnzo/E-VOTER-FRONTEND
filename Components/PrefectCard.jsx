import React, { useContext,useEffect, useState } from "react";
import { userContext } from "../Contexts/userContext.js";
import useInView from '../Hooks/useInView.jsx'

function PrefectCard({posts,candidate,isClicked,setIsClicked,id,setNortification,index}){
    const {votedForCandidates,setVotedForCandidates} = useContext(userContext)
    const [ref,isVisible] = useInView({
        threshold:0.5
    })

    function handleClick(candidate){
        console.log(votedForCandidates)
        // Check if student has already voted for this post and education level
        const hasAlreadyVotedForThisPost = votedForCandidates.some((votedCandidate) => {
            return votedCandidate.prefectorial_Post === candidate.prefectorial_Post &&
                   votedCandidate.education_Level === candidate.education_Level
        })

        if (hasAlreadyVotedForThisPost) {
            // Show error notification instead of allowing the vote
            setNortification((prev) => ({
                ...prev,
                displayMessage: false,
                displayError: true,
                errorMessage: `You have already voted for ${candidate.prefectorial_Post} (${candidate.education_Level}). You can only vote once per position.`
            }))
            return // Exit early, don't proceed with voting
        }

        // If no duplicate found, proceed with voting
        setIsClicked(id)
        setNortification((prev) => ({
            ...prev,
            displayMessage: true,
            displayError: false,
            votedForMessage: `Voted for ${candidate.Candidate_Name} for ${candidate.prefectorial_Post}`
        }))

        setVotedForCandidates((prev) => [...prev, candidate])
    }
    return(
        <>
        <div ref={ref} onClick={() => handleClick(candidate)} key={candidate.id} style={{ transitionDelay: `${index * 0.15}s` }} className={`flex transition-all transition-ease duration-500 -translate-x-20 sm:translate-y-20 opacity-0 ${isVisible ? 'sm:translate-y-0 translate-x-0 opacity-100' : ''} mt-20 sm:mt-10 w-[98%] sm:w-[500px] pr-2  text-white items-center hover:cursor-pointer justify-between shadow-2xl bg-[#101540] rounded-md ${isClicked ? 'border-2 border-[#5478FF]':''}`}>
            <img className='h-[200px] w-[150px] sm:w-[200px] rounded-md object-cover object-center' src={candidate.photo_URL} alt={candidate.Candidate_Name} />
            <div>
                <p>{candidate.Candidate_Name}</p>
                <p>{candidate.Class} {candidate.Stream}</p>
            </div>
            <div className="flex items-center gap-2">
                {isClicked ? 'Voted':'vote'}
                <input className="w-4 h-4 accent-[#5478FF]" type='checkbox' checked={isClicked}/>
            </div>          
        </div>
        </>
    )
}

export default PrefectCard