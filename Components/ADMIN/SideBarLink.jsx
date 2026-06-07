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
        `flex gap-2 p-2 hover:bg-gray-50/30 rounded-md ${isActive ? "bg-[#5478FF] text-white" : "hover:bg-[#5478FF] hover:text-white"}`}>{icon}{textDisplay}
        {textDisplay === "Students" || textDisplay === "Staff/Teachers" ? <div className="sm:none hover:text-white"></div>:null}
        </NavLink>  
    )
}

export default SideBarLink