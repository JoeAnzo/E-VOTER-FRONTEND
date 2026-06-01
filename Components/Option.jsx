import { useContext, useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import { selectContext } from "../Contexts/selectContext";
function Option({text,id,isClicked,setClicked}){
    const {setGrade,setStream} = useContext(selectContext)
    function handleClick(input){
        setClicked(id)
        if (input === 'A' || input === 'B' || input === 'C' || input==='Arts' || input==='Physicals' || input==='Biologicals'){
            setStream(input)
        }
        setGrade(input)
    }
    return(
        <h1 onClick={() => handleClick(text)} className={`py-2 rounded-xl hover:bg-[#5478FF] hover:text-white ${isClicked ? 'text-white':'text-white'} flex gap-2  pl-4 ${isClicked ? 'bg-[#5478FF] rounded-xl' : ''}`}>
            {isClicked ? <CheckIcon color="white"/>:''}{text}
        </h1>
    )
}

export default Option;