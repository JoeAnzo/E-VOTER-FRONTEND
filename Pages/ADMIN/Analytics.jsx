import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import SideBar from "../../Components/ADMIN/SideBar"
import AnalysisCard from "../../Components/ADMIN/AnalysisCard"
import { GraduationCap,Users,User } from "lucide-react"
function Analytics() {
  return (
    <div className="h-screen relative">
            <AdminNavBar/>
            <div className="h-[90%] flex"> 
                <div className="w-[20%]">
                    <SideBar/>
                </div>
                <div className="w-[80%]">
                    <div className="flex justify-between mt-4">
                    <h2 className="text-white text-2xl">View the Analytics here</h2>
                    
                </div>
                </div>
            </div>
    </div>
  )
}

export default Analytics