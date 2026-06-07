import { Link,useLocation } from "react-router-dom"
import {PieChart,LayoutDashboard,ChevronDown,File,LogOutIcon,Download,KeyRoundIcon,GraduationCap,UploadCloud,User2Icon,Users,BarChartBig,KeyRound} from "lucide-react"
import { userContext } from "../../Contexts/userContext.js"
import { useContext } from "react"
import SideBarLink from "./SideBarLink.jsx"
import { useState } from "react"
import Logo from "../Logo.jsx"


function SideBar({handleGenerateOTPs,handleGenerateStaffOTPs,handleFileUpload,handleStaffFileUpload,handleFileChange,handleStudentsExport,handleStaffExport,handleStaffFileChange}) {
  const {toggleIcon} = useContext(userContext)
  const [clicked,setClicked] = useState(null)
  const location = useLocation()
  const path = location.pathname
  console.log(path)
  return (
    <div className={`h-full dark:bg-[#1E293B] border-r border-gray-400 bg-white ${toggleIcon ? 'hidden':'visible'}  absolute z-30 sm:flex flex-1 flex-col pl-8 py-8 dark:text-white text-slate-900 overflow-scroll hide-scrollbar  items-left`}>
        <div className="flex gap-2 items-center py-2">
          <Logo/>
          <div>
              <h2 className="text-2xl dark:text-white text-slate-900">Evoter <br/> Admin</h2>
          </div>
        </div>
        <h2 className="py-2">management</h2>
        <SideBarLink  path="/admin/dashboard" icon={<LayoutDashboard/>} textDisplay="Dashboard"/>
        <div>
          <div className="">
             <SideBarLink  path="/admin/students" icon={<GraduationCap/>} textDisplay="Students"/>
          </div>
          <div className={`flex flex-col ${path === '/admin/students'? '':'hidden'}`}>
            <label htmlFor="fileUpload" className="text-center p-2 gap-2 flex hover:cursor-pointer">
              <File className="dark:text-white text-slate-900"/> File
            </label>
            <input id="fileUpload" type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="hidden"/>
            <button onClick={handleFileUpload} className="p-2 gap-2 flex hover:cursor-pointer">
              <UploadCloud/> Upload List 
            </button>
            <button onClick={handleGenerateOTPs} className="p-2 gap-2 flex hover:cursor-pointer">
              <KeyRoundIcon/> generate OTPS 
            </button>
            <button onClick={handleStudentsExport} className="p-2 gap-2 flex hover:cursor-pointer">
              <Download/> Export List 
            </button>
          </div>
        </div>
        <div>
          <div>
              <SideBarLink  path="/admin/staff" icon={<Users/>} textDisplay="Staff/Teachers"/>
          </div>
          <div className={`flex flex-col ${path === '/admin/staff'? '':'hidden'}`}>
            <label htmlFor="fileUpload" className="text-center p-2 gap-2 flex hover:cursor-pointer">
              <File className="dark:text-white text-slate-900"/> File
            </label>
            <input id="fileUpload" type="file" accept=".xlsx, .xls" onChange={handleStaffFileChange} className="hidden"/>
            <button onClick={handleStaffFileUpload} className="p-2 hover:cursor-pointer gap-2 flex">
              <UploadCloud/> Upload List 
            </button>
            <button onClick={handleGenerateStaffOTPs} className="p-2 gap-2 flex hover:cursor-pointer">
              <KeyRoundIcon/> generate OTPS 
            </button>
            <button onClick={handleStaffExport} className="p-2 hover:cursor-pointer gap-2 flex">
              <Download/> Export List 
            </button>
          </div>
        </div>
        
        <SideBarLink  path="/admin/candidates" icon={<User2Icon/>} textDisplay="Candidates"/>
        <SideBarLink  path="/admin/elections" icon={<PieChart/>} textDisplay="Election Progress"/>
        <SideBarLink  path="/admin/analytics" icon={<BarChartBig/>} textDisplay="Analytics"/>
        <SideBarLink  path="/" icon={<LogOutIcon/>} textDisplay="Log out"/>
    </div>
  )
}

export default SideBar