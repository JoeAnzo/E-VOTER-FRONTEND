import { useState } from "react";
import Option from "./Option";
function DropDown({options,show,form6,grade}){
    const [clicked,setClicked] = useState(null)
    return(
        <div className={`bg-[#0F172A] ${show ? '': 'hidden'} absolute z-20 top-[110%] rounded-xl right-0 left-0 text-white  cursor-pointer`}>

            {
              grade === 'S6' || grade=== 'S5' ? form6.map((option,index)=>{
                    return(
                        <Option key={index} text={option} setClicked={setClicked} isClicked={clicked === index} id={index}/>
                    )
                }) : options.map((option,index)=>{
                    return(
                        <Option key={index} text={option} setClicked={setClicked} isClicked={clicked === index} id={index}/>
                    )
                }) 
            }
        </div>
    )
}

export default DropDown;