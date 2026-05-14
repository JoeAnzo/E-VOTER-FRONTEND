import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import SideBar from "../../Components/ADMIN/SideBar"
import AnalysisCard from "../../Components/ADMIN/AnalysisCard"
import { GraduationCap,Users,User,FileIcon,XIcon} from "lucide-react"
import { fetchStaffMembers,generateOTPsForStaff } from "../../Services/ApiCalls"
import { Helmet } from "react-helmet"
import { useState,useEffect } from "react"
import { OrbitProgress } from "react-loading-indicators"
import StaffMemberDetailsCard from "../../Components/ADMIN/StaffMemberDetailsCard"
function Staff() {
    const [file,setFile] = useState(null)
    const [highLightOtps,setHighLightOtps] = useState(false)
    const [staffList,setStaffList] = useState([])
    const [error,setError] = useState({
        error:false,
        errorMessage:''
    })
    const [nortification,setNortification] = useState({
        show:false,
        message:''
    })
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
    async function handleGenerateStaffOTPs() {
        const Otps = await generateOTPsForStaff()
        if (Otps.success){
            getData()
            setHighLightOtps(true)
            setNortification({
                show:true,
                message:`${Otps.data.message}`
            })
        }
    }
    function handleStaffFileChange(e){
        setFile(e.target.files[0])
    }
    function handleCloseErrorMsg(){
        setError((prev) => {
            return {
                ...prev,
                error:false
            }
        })
    }
    function handleCloseNortification(){
        setNortification(prev => {
            return {prev,show:false}
        })
    }
    async function handleStaffFileUpload(){
        if (!file){
            setError((prev) => {
                return {
                    ...prev,
                    error:true,
                    errorMessage:"You have not selected anything or excel file"
                }
            })
            return
        }
    }
    async function handleStaffExport(){
        const backend_url = import.meta.env.VITE_BACKEND_URL
        window.location.href = `${backend_url}/v1/api/admin/staff/export-csv`
    }
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
                <SideBar handleGenerateStaffOTPs={handleGenerateStaffOTPs} handleStaffFileUpload={handleStaffFileUpload} handleStaffExport={handleStaffExport} handleStaffFileChange={handleStaffFileChange}/>
            </div>
            <div className="sm:w-[80%] w-full overflow-scroll hide-scrollbar">
                <div className="flex  justify-between items-center  pl-4">
                    <h2 className="dark:text-white text-slate-900 my-4 text-2xl sm:text-2xl">Manage Staff/Teachers here</h2>
                    <div className="gap-4 flex pr-4">
                        <button className="text-white px-2 py-2 rounded-lg hover:cursor-pointer bg-[#5478FF]">Add a Staff Member /Teacher</button>
                    </div>
                </div>
                <div className="text-center fixed z-30 mx-auto right-0 left-0 sm:left-60  p-4">
                    {
                        error.error ? <p className="flex justify-between text-red-700 bg-red-200 p-4 rounded-md border-2 border-red-700">{error.errorMessage}<XIcon onClick={handleCloseErrorMsg} className="text-red-700 hover:cursor-pointer"/></p> : nortification.show ? <p className="flex justify-between text-white bg-[#5478FF] rounded-md p-4">{nortification.message}<XIcon onClick={handleCloseNortification} className="text-white hover:cursor-pointer"/></p>:null
                    }
                </div>
                <div>
                    {
                        loading ? <div className="h-screen flex items-center justify-center"><OrbitProgress color="#5478FF" size="medium"/></div> :
                        staffList.map((staff,index)=>{
                            return <StaffMemberDetailsCard key={index} highLightOtps={highLightOtps} staffDetails={staff}/>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Staff