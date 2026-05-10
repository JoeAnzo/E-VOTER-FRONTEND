import { Link } from "react-router-dom"
import {PieChart,LayoutDashboard,LogOutIcon,GraduationCap,User2Icon,Users,BarChartBig,KeyRound} from "lucide-react"
import { userContext } from "../../Contexts/userContext.js"
import { useContext } from "react"
import SideBarLink from "./SideBarLink.jsx"
import { useState } from "react"
function SideBar() {
  const {toggleIcon} = useContext(userContext)
  const [clicked,setClicked] = useState(null)
  return (
    <div className={`h-full dark:bg-[#1E293B] bg-white ${toggleIcon ? 'hidden':'visible'}  absolute z-30 sm:flex flex-1 flex-col pl-8 py-8 dark:text-white text-slate-900 shadow-2xl  items-left`}>
        <SideBarLink index={0} setClicked={setClicked} isClicked={clicked === 0} path="/admin/dashboard" icon={<LayoutDashboard/>} textDisplay="Dashboard"/>
        <SideBarLink index={1} setClicked={setClicked} isClicked={clicked === 1} path="/admin/students" icon={<GraduationCap/>} textDisplay="Students"/>
        <SideBarLink index={2} setClicked={setClicked} isClicked={clicked === 2} path="/admin/staff" icon={<Users/>} textDisplay="Staff/Teachers"/>
        <SideBarLink index={3} setClicked={setClicked} isClicked={clicked === 3} path="/admin/candidates" icon={<User2Icon/>} textDisplay="Candidates"/>
        <SideBarLink index={4} setClicked={setClicked} isClicked={clicked === 4} path="/admin/elections" icon={<PieChart/>} textDisplay="Election Progress"/>
        <SideBarLink index={6} setClicked={setClicked} isClicked={clicked === 6} path="/admin/analytics" icon={<BarChartBig/>} textDisplay="Analytics"/>
        <SideBarLink index={7} setClicked={setClicked} isClicked={clicked === 7} path="/" icon={<LogOutIcon/>} textDisplay="Log out"/>
    </div>
  )
}

export default SideBar