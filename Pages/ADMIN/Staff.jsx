import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import SideBar from "../../Components/ADMIN/SideBar"
import AnalysisCard from "../../Components/ADMIN/AnalysisCard"
import { GraduationCap,Users,User } from "lucide-react"
import { fetchStaffMembers } from "../../Services/ApiCalls"
import { Helmet } from "react-helmet"
import { useState,useEffect } from "react"
import { OrbitProgress } from "react-loading-indicators"
import StaffMemberDetailsCard from "../../Components/ADMIN/StaffMemberDetailsCard"
function Staff() {
    const [staffList,setStaffList] = useState([])
    const [loading,setLoading] = useState([])
    async function getData() {
        setLoading(true)
        const staffMembers = await fetchStaffMembers()
        if (staffMembers.success){
            setLoading(false)
            setStaffList(staffMembers.data.StaffMembers)
        }
    }
    useEffect(() => {
        getData()
    },[])
    console.log(staffList)
  return (
    <div className="h-screen relative">
        <Helmet>
            <title>Manage Staff/Teachers</title>
            <meta name="description" content="Manage staff and teachers for your school's elections with ease using the E-voter platform. Add, edit, and organize staff members to ensure a smooth and efficient election process." />
            <meta name="keywords" content="E-voter, manage staff, manage teachers, school elections, add staff, edit staff, organize staff, election process" />
        </Helmet>
        <AdminNavBar/>
        <div className="h-[90%] flex"> 
            <div className="sm:w-[20%]">
                <SideBar/>
            </div>
            <div className="sm:w-[80%] w-full overflow-scroll hide-scrollbar">
                <div className="flex justify-between mt-4">
                    <h2 className="text-white text-2xl">Mange Staff/Teachers here</h2>
                    <div className="gap-4 flex pr-4">
                        <button className="text-white px-2 py-2 rounded-lg hover:cursor-pointer bg-[#5478FF]">Add a Staff Member /Teacher</button>
                        <button className="text-white px-2 py-2 rounded-lg hover:cursor-pointer bg-[#5478FF]">Upload List</button>
                    </div>
                </div>
                <div>
                    {
                        loading ? <div className="h-screen flex items-center justify-center"><OrbitProgress color="#5478FF" size="medium"/></div> :
                        staffList.map((staff,index)=>{
                            return <StaffMemberDetailsCard key={index} staffDetails={staff}/>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Staff