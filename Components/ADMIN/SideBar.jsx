import { Link } from "react-router-dom"
import {PieChart,LayoutDashboard,LogOutIcon,GraduationCap,User2Icon,Users,BarChartBig,KeyRound} from "lucide-react"
import { userContext } from "../../Contexts/userContext.js"
import { useContext } from "react"
function SideBar() {
  const {toggleIcon} = useContext(userContext)
  return (
    <div className={`h-full dark:bg-[#1E293B] bg-white ${toggleIcon ? 'hidden':''}  absolute sm:flex flex-1 flex-col pl-8 py-8 dark:text-white text-slate-900 shadow-2xl justify-between items-left`}>
        <Link to="/admin/dashboard" className="flex gap-2 p-4 rounded-md hover:text-white hover:bg-[#5478FF]"><LayoutDashboard/>Dash Board</Link>
        <Link to="/admin/students" className="flex gap-2 p-4 rounded-md hover:text-white hover:bg-[#5478FF]"><GraduationCap/>Students</Link>
        <Link to="/admin/staff" className="flex gap-2 p-4 rounded-md hover:text-white hover:bg-[#5478FF]"><Users/>Staff/Teachers</Link>
        <Link to="/admin/candidates" className="flex gap-2 p-4 rounded-md hover:text-white hover:bg-[#5478FF]"><User2Icon/>Candidates</Link>
        <Link to="/admin/elections" className="flex gap-2 p-4 rounded-md hover:text-white hover:bg-[#5478FF]"><PieChart/>Election Progress</Link>
        <Link to="/admin/generateOtps" className="flex gap-2 p-4 rounded-md hover:text-white hover:bg-[#5478FF]"><KeyRound/>Generate OTPs</Link>
        <Link to="/admin/analytics" className="flex gap-2 p-4 rounded-md hover:text-white hover:bg-[#5478FF]"><BarChartBig/>Analytics</Link>
        <Link to="/" className="flex gap-2 p-4"><LogOutIcon/>Log out</Link>
    </div>
  )
}

export default SideBar