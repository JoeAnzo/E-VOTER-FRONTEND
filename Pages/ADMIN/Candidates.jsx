import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import SideBar from "../../Components/ADMIN/SideBar"
import AnalysisCard from "../../Components/ADMIN/AnalysisCard"
import {ChevronDown,SearchIcon} from "lucide-react"
import CandidateDetails from "../../Components/ADMIN/CandidateDetails"
import { fetchPrefects } from "../../Services/ApiCalls"
import { useEffect,useState } from "react"
import { OrbitProgress } from "react-loading-indicators"
import {Helmet} from 'react-helmet'

function Candidates() {
    const [candidatesList,setCandidatesList] = useState([])
    const [loading,setLoading] = useState(false)
    async function fetchPrefectsData(){
        setLoading(true)
        const prefects = await fetchPrefects()
        if (prefects.success){
            setLoading(false)
            setCandidatesList(prefects.data.candidates)
            console.log(prefects.data.candidates)
        }
    }
    useEffect(()=>{
        fetchPrefectsData()
        console.log(candidatesList)
    },[])
  return (
    <div className="h-screen relative">
        <Helmet>
            <title>Manage Candidates</title>
            <meta name="description" content="Manage candidates for your school's elections with ease using the E-voter platform. Add, edit, and organize candidates to ensure a smooth and efficient election process." />
            <meta name="keywords" content="E-voter, manage candidates, school elections, add candidates, edit candidates, organize candidates, election process" />
        </Helmet>
        <AdminNavBar/>
        <div className="h-full flex"> 
            <div className="sm:w-[20%]">
                <SideBar/>
            </div>
            <div className="sm:w-[80%] h-full w-full overflow-scroll hide-scrollbar">
                <div className="flex justify-between mt-4">
                    <h2 className="text-white text-2xl">Manage Candidates here</h2>
                    <div className="gap-4 flex pr-4">
                        <div className="flex items-center gap-2">
                                <div className="text-white flex gap-4 hover:cursor-pointer bg-[#5478FF] p-2 rounded-md">Class<ChevronDown/></div>
                                <div className="text-white flex gap-4 hover:cursor-pointer bg-[#5478FF] p-2 rounded-md">Positions<ChevronDown/></div>
                                <input type="text" className="bg-white p-2 rounded-md" placeholder="Search Candidates here"/>
                                <SearchIcon color="white"/>
                        </div>
                        <button className="text-white px-2 py-2 rounded-lg hover:cursor-pointer bg-[#5478FF]">Add a Candidate</button>
                    </div>
                </div>
                <div>
                    {   loading ? <div className="h-screen flex items-center justify-center"><OrbitProgress color="#5478FF" size="medium"/></div> :
                        candidatesList.map((candidate)=>{
                            return <CandidateDetails details={candidate} />
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Candidates