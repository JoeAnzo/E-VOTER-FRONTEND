import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import SideBar from "../../Components/ADMIN/SideBar"
import AnalysisCard from "../../Components/ADMIN/AnalysisCard"
import { GraduationCap,Users,User,Bot } from "lucide-react"
function Analytics() {
  return (
    <div className="h-screen relative">
            <AdminNavBar/>
            <div className="h-[90%] flex"> 
                <div className="w-[20%]">
                    <SideBar/>
                </div>
                <div className="w-[80%]">
                    <div className="flex gap-1.5 mt-4">
                      <Bot className="dark:text-white text-slate-900"/>
                      <h2 className="text-white text-2xl">Ask me something concerning the Elections</h2>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Analytics