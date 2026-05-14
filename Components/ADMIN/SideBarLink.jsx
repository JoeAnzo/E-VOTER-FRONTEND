import {NavLink} from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../../Contexts/userContext"
import { ChevronDown } from "lucide-react"
function SideBarLink({ path, icon, textDisplay}){
    const {toggleIcon,setToggleIcon} = useContext(userContext)
    function handleClick(){
        setToggleIcon(true)
    }
    return(
        <NavLink onClick={handleClick} to={path} className={({ isActive }) =>
        `flex gap-2 p-4 rounded-md ${isActive ? "bg-[#5478FF] text-white" : "hover:bg-[#5478FF] hover:text-white"}`}>{icon}{textDisplay}
        {textDisplay === "Students" || textDisplay === "Staff/Teachers" ? <div className="sm:none"><ChevronDown className="dark:text-white text-slate-900"/></div>:null}
        </NavLink>  
    )
}

export default SideBarLink