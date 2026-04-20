import {Link} from "react-router-dom"
function SideBarLink(path,icon,textDisplay){
    return(
        <Link to={path} className="flex gap-2 p-4 rounded-md hover:bg-[#5478FF]">{icon}{textDisplay}</Link>
    )
}

export default SideBarLink