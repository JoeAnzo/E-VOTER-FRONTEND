import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import SideBar from "../../Components/ADMIN/SideBar"
import StudentNameDisplay from "../../Components/ADMIN/StudentNameDisplay"
import {SearchIcon,ChevronDown,FileIcon,XIcon} from "lucide-react"
import { fetchStudents,fetchStudentsPerClass,uploadFile,exportStudentList, generateOTPsForStudents} from "../../Services/ApiCalls.js"
import { useEffect,useState } from "react"
import { OrbitProgress } from "react-loading-indicators"
import { searchStudent } from "../../Services/ApiCalls.js"
import ClassListDropDown from "../../Components/ADMIN/ClassListDropDown.jsx"
import StreamListDropDown from "../../Components/ADMIN/StreamListDropDown.jsx"
import {Helmet} from 'react-helmet'
function Students() {
    const [loading,setLoading] = useState(false)
    const [studentSearch,setStudentSearch] = useState('')
    const [studentList,setStudentList] = useState([])
    const [clickedClass,setClickedClass] = useState(false)
    const [clickedStream,setClickedStream] = useState(false)
    const [selectedClass,setSelectedClass] = useState('')
    const [selectedStream,setSelectedStream] = useState('')
    const [highLightOtps,setHighLightOtps] = useState(false)
    const [error,setError] = useState({
        error:false,
        errorMessage:''
    })
    const [nortification,setNortification] = useState({
        show:false,
        message:''
    })
    const [file,setFile] = useState(null)
    async function getStudents(){
        setLoading(true)
        const students = await fetchStudents()
        console.log(students.data.Students)
        if (students.success){
            setStudentList(students.data.Students)
            setLoading(false)
        }
        
    }
    function handleClassClick(){
        if (clickedStream){
            setClickedStream(false)
        }
        setClickedClass(prev => !prev)
    }
    function handleStreamClick(){
        if (clickedClass){
            setClickedClass(false)
        }
        setClickedStream(prev => !prev)
        console.log(clickedStream)
    }
    async function handleStudentSearch(){
        setError((prev)=>{
            return {
                ...prev,
                error:false
            }
        })
        if (!studentSearch.trim()){
            setError((prev) => {
                return {
                    ...prev,
                    error:true,
                    errorMessage:"Please enter a student's Name"
                }
            })
            return
        }
        setLoading(true)
        const searchResults = await searchStudent(studentSearch)
        if (searchResults.success){
            setLoading(false)
            console.log(studentSearch)
            console.log(searchResults)
            setStudentList(searchResults.data.Students)
        }
    }
    useEffect(()=>{
        getStudents()
    },[])


    async function getStudentsPerClass(){
        setLoading(true)
        const students = await fetchStudentsPerClass(selectedClass)
        if (students.success){
            setLoading(false)
            setStudentList(students.data.Students)
        }
    }

    useEffect(() => {
        if (selectedClass === ''){
            return
        }
        getStudentsPerClass()
    },[selectedClass])

    function handleFileChange(e){
        setFile(e.target.files[0])
    }

    async function handleFileUpload(){
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

        const formData = new FormData()
        formData.append('excelFile',file)
        const response = await uploadFile(formData)
        console.log(response)
    }
    async function handleStudentsExport(){
        const backend_url = import.meta.env.VITE_BACKEND_URL
        window.location.href = `${backend_url}/v1/api/admin/students/export-csv`
    }
    async function handleGenerateOTPs() {
        const Otps = await generateOTPsForStudents()
        if (Otps.success){
            setHighLightOtps(true)
            setNortification({
                show:true,
                message:`${Otps.data.message}`
            })
        }
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
  return (
    <div className="h-screen relative">
        <Helmet>
            <title>Manage Students</title>
            <meta name="description" content="Manage students for your school's elections with ease using the E-voter platform. Add, edit, and organize students to ensure a smooth and efficient election process." />
            <meta name="keywords" content="E-voter, manage students, school elections, add students, edit students, organize students, election process" />
        </Helmet>
        <AdminNavBar/>
        <div className="h-[90%] flex"> 
            <div className="sm:w-[20%]">
                <SideBar/>
            </div>
            <div className="sm:w-[80%] w-full relative overflow-scroll hide-scrollbar">
                <div className="flex flex-col sm:flex-row justify-between mt-4  w-full">
                    <h2 className="dark:text-white text-slate-900 text-lg sm:text-2xl mr-2 ml-2 sm:ml-0">Manage Students here</h2>
                    <div className="gap-4 flex flex-col sm:flex-row pr-4">
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                            <div className="flex gap-4">
                                <div onClick={handleClassClick} className="text-white flex gap-4 hover:cursor-pointer bg-[#5478FF] p-2 rounded-md relative">
                                    {selectedClass !== '' ? selectedClass : 'Class'}<ChevronDown/>
                                    <div className={`absolute ${clickedClass ? '': 'hidden'} mt-2 left-[50%] right-[50%] -translate-x-[50%] top-full dark:bg-[#0F172A] bg-[#5478FF] rounded-md z-30 w-full`}>
                                        <ClassListDropDown setSelectedClass={setSelectedClass} list={["S1","S2","S3","S4","S5","S6"]}/>       
                                    </div>
                                </div>
                                <div onClick={handleStreamClick} className="text-white flex gap-4 hover:cursor-pointer bg-[#5478FF] p-2 rounded-md relative">
                                        {selectedStream !== '' ? selectedStream : 'Stream'}<ChevronDown/>
                                    <div  className={`absolute ${clickedStream ? '': 'hidden'} mt-2 left-[50%] right-[50%] rounded-md -translate-x-[50%] top-full dark:bg-[#0F172A] bg-[#5478FF] z-30 w-full `}>
                                        <StreamListDropDown setSelectedStream={setSelectedStream} list={["A","B","C","D","Arts","Physicals","Biologicals"]}/>       
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center justify-  order-first">
                                <input type="text" value={studentSearch} onChange= {(e) => {setStudentSearch(e.target.value)}} className="bg-white p-2 rounded-md" placeholder="Search Student here"/>
                                <SearchIcon onClick={handleStudentSearch} className="hover:cursor-pointer text-slate-900 dark:text-white"/>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <label className="hidden text-white px-2 rounded-lg hover:cursor-pointer bg-[#5478FF] sm:flex items-center" htmlFor="fileUpload"><FileIcon color="white"/></label>
                            <input type="file" id="fileUpload" accept=".xlsx, .xls" onChange={handleFileChange} className="hidden" />
                            <button onClick={handleFileUpload} className="text-white px-2 rounded-lg hover:cursor-pointer bg-[#5478FF] sm:flex items-center">upload</button>
                            <button onClick={handleStudentsExport} className="text-white px-2 rounded-lg hover:cursor-pointer bg-[#5478FF] sm:flex items-center">Export List</button>
                            <button onClick={handleGenerateOTPs} className="text-white px-2 rounded-lg hover:cursor-pointer bg-[#5478FF] sm:flex items-center">Generate OTPs</button>
                        </div>
                        </div>
                        
                </div>
                <div className="text-center fixed z-30 mx-auto right-0 left-0 sm:left-60  p-4">
                    {
                        error.error ? <p className="flex justify-between text-red-700 bg-red-200 p-4 rounded-md border-2 border-red-700">{error.errorMessage}<XIcon onClick={handleCloseErrorMsg} className="text-red-700 hover:cursor-pointer"/></p> : nortification.show ? <p className="flex justify-between text-white bg-[#5478FF] rounded-md p-4">{nortification.message}<XIcon onClick={handleCloseNortification} className="text-white hover:cursor-pointer"/></p>:null
                    }
                </div>
                <div className=""> 
                    {
                    loading ? <div className="h-screen flex items-center justify-center"><OrbitProgress color="#5478FF" size="medium"/></div> :
                    studentList.map((student)=>{
                        return <StudentNameDisplay Name={student.Name} Class={student.Class} Stream={student.Stream} OTP={student.otp} highLightOtps={highLightOtps} hasVoted={student.hasVoted}/>
                    })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Students