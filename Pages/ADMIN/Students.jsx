import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import SideBar from "../../Components/ADMIN/SideBar"
import StudentNameDisplay from "../../Components/ADMIN/StudentNameDisplay"
import {SearchIcon,ChevronDown} from "lucide-react"
import { fetchStudents,fetchStudentsPerClass } from "../../Services/ApiCalls.js"
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
    const [error,setError] = useState({
        error:false,
        errorMessage:''
    })
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
            <div className="sm:w-[80%] w-full overflow-scroll hide-scrollbar">
                <div className="flex justify-between mt-4 fixed z-20">
                    <h2 className="dark:text-white text-slate-900 text-lg sm:text-2xl mr-2 ml-2 sm:ml-0">Manage Students here</h2>
                    <div className="gap-4 flex pr-4">
                        <div className="flex items-center gap-2">
                            <div onClick={handleClassClick} className="text-white flex gap-4 hover:cursor-pointer bg-[#5478FF] p-2 rounded-md relative">
                                {selectedClass !== '' ? selectedClass : 'Class'}<ChevronDown/>
                                <div className={`absolute ${clickedClass ? '': 'hidden'} mt-2 left-[50%] right-[50%] -translate-x-[50%] top-full bg-[#0F172A] rounded-md z-30 w-full`}>
                                    <ClassListDropDown setSelectedClass={setSelectedClass} list={["S1","S2","S3","S4","S5","S6"]}/>       
                                </div>
                            </div>
                            <div onClick={handleStreamClick} className="text-white flex gap-4 hover:cursor-pointer bg-[#5478FF] p-2 rounded-md relative">
                                {selectedStream !== '' ? selectedStream : 'Stream'}<ChevronDown/>
                                <div  className={`absolute ${clickedStream ? '': 'hidden'} mt-2 left-[50%] right-[50%] rounded-md -translate-x-[50%] top-full bg-[#0F172A] z-30 w-full `}>
                                    <StreamListDropDown setSelectedStream={setSelectedStream} list={["A","B","C","D","Arts","Physicals","Biologicals"]}/>       
                                </div>
                            </div>
                            <input type="text" value={studentSearch} onChange={(e) => {setStudentSearch(e.target.value)}} className="bg-white p-2 rounded-md" placeholder="Search Student here"/>
                            <SearchIcon onClick={handleStudentSearch} className="hover:cursor-pointer" color="white"/>
                        </div>
                        <button className="text-white px-2  rounded-lg hover:cursor-pointer bg-[#5478FF]">Add a Student</button>
                        <label className="text-white px-2 rounded-lg hover:cursor-pointer bg-[#5478FF] flex items-center" htmlFor="fileUpload">Upload</label>
                        <input type="file" id="fileUpload" className="hidden" />
                    </div>
                </div>
                <div className="text-center absolute mx-auto">
                    {
                        error.error ? <p className="text-red-700">{error.errorMessage}</p> : null
                    }
                    </div>
                <div className="pt-15"> 
                    {
                    loading ? <div className="h-screen flex items-center justify-center"><OrbitProgress color="#5478FF" size="medium"/></div> :
                    studentList.map((student)=>{
                        return <StudentNameDisplay Name={student.Name} Class={student.Class} Stream={student.Stream} OTP={student.otp} hasVoted={student.hasVoted}/>
                    })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Students