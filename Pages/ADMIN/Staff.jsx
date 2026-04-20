import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import SideBar from "../../Components/ADMIN/SideBar"
import AnalysisCard from "../../Components/ADMIN/AnalysisCard"
import { GraduationCap,Users,User } from "lucide-react"

function Staff() {
  return (
    <div className="h-screen relative">
        <AdminNavBar/>
        <div className="h-[90%] flex"> 
            <div className="sm:w-[20%]">
                <SideBar/>
            </div>
            <div className="sm:w-[80%] w-full">
                <div className="flex justify-between mt-4">
                    <h2 className="text-white text-2xl">Mange Staff/Teachers here</h2>
                    <div className="gap-4 flex pr-4">
                        <button className="text-white px-2 py-2 rounded-lg hover:cursor-pointer bg-[#5478FF]">Add a Staff Member /Teacher</button>
                        <button className="text-white px-2 py-2 rounded-lg hover:cursor-pointer bg-[#5478FF]">Upload List</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Staff