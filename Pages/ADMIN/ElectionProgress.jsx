import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import SideBar from "../../Components/ADMIN/SideBar"

function ElectionProgress() {
  return (
    <div className="h-screen relative">
        <AdminNavBar/>
        <div className="h-[90%] flex"> 
            <div className="sm:w-[20%]">
                <SideBar/>
            </div>
            <div className="sm:w-[80%] w-full">
                <div className="flex justify-between mt-4">
                    <h2 className="text-white text-2xl">View the elections live here</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ElectionProgress