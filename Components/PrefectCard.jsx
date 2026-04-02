import React, { useContext,useEffect, useState } from "react";
import { userContext } from "../Contexts/userContext.js";
import useInView from '../Hooks/useInView.jsx'

function PrefectCard({posts,candidate,isClicked,setIsClicked,id,setNortification}){
    const {votedForCandidates,setVotedForCandidates} = useContext(userContext)
    const [ref,isVisible] = useInView({
        threshold:0.5
    })

    function handleClick(candidate){
        setIsClicked(id)
        setNortification((prev)=>{
            return {
                ...prev,
                displayMessage:true,
                displayError:false,
                votedForMessage:`You have voted ${candidate.candidate_Name} as your ${candidate.prefectorial_Post}`
            }
        })
        setVotedForCandidates((prev) => {
           return (
            [...prev,candidate]
        )
        })
        console.log(votedForCandidates)
    }
    return(
        <>
        <div ref={ref} onClick={() => handleClick(candidate)} key={candidate.id} className={`flex mt-20 w-[98%] sm:w-[500px] pr-2  text-white items-center hover:cursor-pointer justify-between shadow-2xl bg-[#101540] rounded-md ${isClicked ? 'border-2 border-[#5478FF]':''}`}>
            <img className='h-[200px] w-[200px] rounded-md object-cover object-center' src={candidate.photo_URL} alt={candidate.Candidate_Name} />
            <div>
                <p>{candidate.Candidate_Name}</p>
                <p>{candidate.Class} {candidate.Stream}</p>
            </div>
            <div className="flex items-center gap-2">
                {isClicked ? 'Voted':'vote'}
                <input className="w-4 h-4 accent-[#5478FF]" type='checkbox' checked={isClicked}/>
                <p>{isVisible}</p>
            </div>          
        </div>
        </>
    )
}

export default PrefectCard