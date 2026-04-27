import { useState,useEffect } from "react"
import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import SideBar from "../../Components/ADMIN/SideBar"
import AnalysisCard from "../../Components/ADMIN/AnalysisCard"
import { GraduationCap,Users,User } from "lucide-react"
import SchoolAnalysisLineGraph from "../../Components/ADMIN/SchoolAnalysisLineGraph"
import PrefectsPieChart from "../../Components/ADMIN/PrefectsPieChart"
import { fetchStudents,fetchPrefects } from "../../Services/ApiCalls"
import StaffAnalysisLineGraph from "../../Components/ADMIN/StaffAnalysisLineGraph"
import {Helmet} from 'react-helmet'
function DashBoard() {
    const [totalNumberOfStudents,setTotalNumberOfStudents] = useState(0)
    const [totalNumberOfCandidates,setTotalNumberOfCandidates] = useState(0)
    async function getStats() {
        const studentsTotalData = await fetchStudents()
        const candidatesTotalData = await fetchPrefects()
        if (studentsTotalData.success){
            setTotalNumberOfStudents(studentsTotalData.data.Students.length)
        }
        if (candidatesTotalData.success){
            setTotalNumberOfCandidates(candidatesTotalData.data.candidates.length)
        }
    }
    useEffect(() => {
        getStats()
    },[])
  return (
    <div className="h-screen relative">
        <Helmet>
            <title>Admin Dashboard</title>
            <meta name="description" content="View analytics of students, staff or teachers and candidates or prefects" />
        </Helmet>
        <AdminNavBar/>
        <div className="h-[90%] flex"> 
            <div className="sm:w-[20%] ">
                <SideBar/>
            </div>
            <div className="sm:w-[80%] w-full overflow-scroll hide-scrollbar">
                <h2 className="dark:text-white text-slate-900 text-2xl ml-4 mt-8">Welcome Admin</h2>
                <h2 className="dark:text-white text-slate-900 text-2xl ml-4 mb-8">Dash Board</h2>
                <div className="flex sm:flex-row flex-col gap-4 px-4 mt-4">
                   <AnalysisCard heading="Students" icon={<GraduationCap className="text-white" size={40}/>} numberDisplay={totalNumberOfStudents} />
                   <AnalysisCard heading="Staff/Teachers" icon={<Users className="text-white" size={40}/>} numberDisplay={1000} /> 
                   <AnalysisCard heading="Candidates" icon={<User className="text-white" size={40}/>} numberDisplay={totalNumberOfCandidates} /> 
                </div>
                <div>
                    <h2 className="dark:text-white text-slate-900 text-2xl ml-4 my-8">Students Entrolled</h2>
                    <SchoolAnalysisLineGraph/>
                </div>
                <div>
                    <h2 className="dark:text-white text-slate-900 text-2xl ml-4 my-8">Candidates or Prefects Entrolled</h2>
                    <PrefectsPieChart/>
                </div>
                <div>
                    <h2 className="dark:text-white text-slate-900 text-2xl ml-4 my-8">Staff Members Entrolled</h2>
                    <StaffAnalysisLineGraph/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashBoard