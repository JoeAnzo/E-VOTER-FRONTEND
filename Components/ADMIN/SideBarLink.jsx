import {NavLink} from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../../Contexts/userContext"
function SideBarLink({ path, icon, textDisplay,index,setClicked,isClicked}){
    const {toggleIcon,setToggleIcon} = useContext(userContext)
    function handleClick(){
        setToggleIcon(true)
    }
    return(
        <NavLink onClick={handleClick} to={path} className={({ isActive }) =>
        `flex gap-2 p-4 rounded-md ${isActive ? "bg-[#5478FF] text-white" : "hover:bg-[#5478FF] hover:text-white"}`}>{icon}{textDisplay}</NavLink>
    )
}

export default SideBarLink