import { useContext, useState } from "react";
import { selectContext } from "../Contexts/selectContext";

function SearchResults({results}){
    const {setName,setGrade,setStream,setDisplaySearch} = useContext(selectContext)
    // if (results.Students){
    //   setDisplaySearch(true)
    // }
    function handleClick(name,grade,stream){
      setName(name)
      setGrade(grade)
      setStream(stream)
      localStorage.setItem("studentInfo",JSON.stringify({
        name:name,
        class:grade,
        stream:stream
      }))
      setDisplaySearch(false)
    }
    return(
        <div className="absolute top-full z-10 left-0 right-0 bg-[#5478FF] rounded-xl text-white">
          {
            results?.Students? results.Students.map((search)=>{
                return <p onClick={() => handleClick(search.Name,search.Class,search.Stream)} className="py-2 pl-2 cursor-pointer hover:bg-[#101540] hover:text-white hover:rounded-xl">{search.Name}</p>
            }):null
          }
        </div>
    )
}

export default SearchResults;