import React, { useContext,useEffect, useState } from "react";
import { userContext } from "../Contexts/userContext.js";
import useInView from '../Hooks/useInView.jsx'

function PrefectCard({candidate,isClicked,setIsClicked,id,setNortification,index,votedForCandidatesCurrentPost,setVotedForCandidatesCurrentPost}){
    
    const [ref,isVisible] = useInView({
        threshold:0.5
    })

    function handleClick(candidate){

        console.log(votedForCandidatesCurrentPost)

        // Check if student has already voted for this post and education level
        const hasAlreadyVotedForThisPost = votedForCandidatesCurrentPost.some((votedCandidate) => {
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
            votedForMessage: `Voted for ${candidate.Candidate_Name} for ${candidate.prefectorial_Post} ${candidate.education_Level}`
        }))

        setVotedForCandidatesCurrentPost((prev) => [...prev, candidate])
    }

    const hasAlreadyVotedForThisCandidate = votedForCandidatesCurrentPost.some((votedCandidate)=>{
            return votedCandidate === candidate
        })

    let checked = isClicked || hasAlreadyVotedForThisCandidate

    return(
        <>
        <div ref={ref} onClick={() => handleClick(candidate)} key={candidate.id} style={{ transitionDelay: `${index * 0.15}s` }} className={`flex transition-all transition-ease duration-500 -translate-x-20 sm:translate-y-20 opacity-0 ${isVisible ? 'sm:translate-y-0 translate-x-0 opacity-100' : ''} w-[98%] sm:w-[500px] pr-2  text-white items-center hover:cursor-pointer justify-between shadow-2xl bg-[#1E293B] rounded-md ${(isClicked || checked) ? 'border-2 border-[#5478FF]':''}`}>
            <img className='h-50 w-37.5 sm:w-50 rounded-md object-cover object-center' src={candidate.photo_URL} alt={candidate.Candidate_Name} />
            <div>
                <p>{candidate.Candidate_Name}</p>
                <p>{candidate.education_Level}</p>
                <p>{candidate.Class} {candidate.Stream}</p>
            </div>
            <div className="flex items-center gap-2">
                {isClicked ? 'Voted':'vote'}
                <input className="w-4 h-4 accent-[#5478FF]" type='checkbox' checked={checked}/>
            </div>          
        </div>
        </>
    )
}

export default PrefectCard