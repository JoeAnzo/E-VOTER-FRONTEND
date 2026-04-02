import React, { useContext,useEffect, useState } from "react";
import { userContext } from "../Contexts/userContext.js";


function PrefectCard({posts,candidate,isClicked,setIsClicked,id,setNortification}){
    const things = useContext(userContext)
    console.log(things)

    const [isIntersecting,setIsintersecting] = useState(false)

    useEffect(()=>{
        const observer = new  IntersectionObserver((entries)=>{
            entries.map((entry)=>{
                console.log(entry)
            })
        })
    },[])
    function handleClick(name,post){
        setIsClicked(id)
        setNortification((prev)=>{
            return {
                ...prev,
                displayMessage:true,
                displayError:false,
                votedForMessage:`You have voted ${name} as your ${post}`
            }
        })
    }
    return(
        <>
        <div onClick={() => handleClick(candidate.Candidate_Name,candidate.prefectorial_Post)} key={candidate.id} className={`flex mt-20 w-[98%] sm:w-[500px] pr-2  text-white items-center hover:cursor-pointer justify-between shadow-2xl bg-[#101540] rounded-md ${isClicked ? 'border-2 border-[#5478FF]':''}`}>
            <img className='h-[200px] w-[200px] rounded-md object-cover object-center' src={candidate.photo_URL} alt={candidate.Candidate_Name} />
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