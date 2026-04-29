import React, { useContext,useEffect, useState } from "react";
import { userContext } from "../Contexts/userContext.js";
import useInView from '../Hooks/useInView.jsx'

function PrefectCard({candidate,isClicked,setIsClicked,id,setNortification,index,votedForCandidatesCurrentPost,setVotedForCandidatesCurrentPost}){
    
    const [ref,isVisible] = useInView({
        threshold:0.5
    })

    console.log(isVisible)

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

        setVotedForCandidatesCurrentPost((prev) => [...prev, {
            Candidate_Name: candidate.Candidate_Name,
            education_Level: candidate.education_Level,
            prefectorial_Post: candidate.prefectorial_Post
        }])
    }

    const hasAlreadyVotedForThisCandidate = votedForCandidatesCurrentPost.some((votedCandidate) => {
        return votedCandidate.Candidate_Name === candidate.Candidate_Name &&
               votedCandidate.prefectorial_Post === candidate.prefectorial_Post &&
               votedCandidate.education_Level === candidate.education_Level
    })

    let checked = isClicked || hasAlreadyVotedForThisCandidate

    return(
        <>
        <div ref={ref} onClick={() => handleClick(candidate)} key={candidate.id} style={{
            transform: isVisible ? 'translateX(0) translateY(0)' : 'translateX(-5rem) translateY(2rem)',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 500ms ease-out, transform 500ms ease-out',
            transitionDelay: `${index * 0.15}s`,
            willChange: 'opacity, transform'
          }} className={`flex w-[98%] sm:w-125 pr-2 text-slate-900 dark:text-white items-center hover:cursor-pointer justify-between shadow-2xl bg-[F9FAFB] dark:bg-[#1E293B] rounded-md ${(isClicked || checked) ? 'border-2 border-[#5478FF]':''}`}>
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