import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import SideBar from "../../Components/ADMIN/SideBar"
import AnalysisCard from "../../Components/ADMIN/AnalysisCard"
import {ChevronDown,SearchIcon} from "lucide-react"
import CandidateDetails from "../../Components/ADMIN/CandidateDetails"
import { fetchPrefects,searchCandidate } from "../../Services/ApiCalls"
import PrefectList from "../../Components/ADMIN/PrefectList"
import { useEffect,useState } from "react"
import { OrbitProgress } from "react-loading-indicators"
import {Helmet} from 'react-helmet'

function Candidates() {
    const [candidatesList,setCandidatesList] = useState([])
    const [loading,setLoading] = useState(false)
    const [position,setPosition] = useState('')
    const [searchQuery,setSearchQuery] = useState('')
    const [showPrefectPositions,setShowPrefectPositions] = useState(false)

    async function fetchPrefectsData(){
        setLoading(true)
        const prefects = await fetchPrefects()
        if (prefects.success){
            setLoading(false)
            setCandidatesList(prefects.data.candidates)
            console.log(prefects.data.candidates)
        }
    }

    function togglePositionsList(){
        setShowPrefectPositions(prev => !prev)
    }

    async function handleSearchQuery(){
        if (searchQuery !== ''){
            setLoading(true)
            const searchResults = await searchCandidate(searchQuery)
            if (searchResults.success){
                setCandidatesList(searchResults.data.Candidates)
                setLoading(false)
            }
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
            <div className="sm:w-[80%] relative h-full w-full overflow-scroll hide-scrollbar">
            <div className=" absolute top-0 left-0 bottom-0 right-0 z-60 flex justify-center items-center">
                <div className="flex flex-col items-center pt-4">
                    <h2>ADD A CANDIDATE</h2>
                    <label>Candidate's Name</label>
                    <input type="text" className="p-2 text-left bg-white rounded-md"/>
                    <label>Class</label>
                    <input type="text" placeholder="Class" className="p-2 bg-white rounded-md"/>
                    <label>Education Level</label>
                    <input id="level" className="bg-white p-2" type="text" placeholder="Class"/>
                    <label>Prefectorial Post</label>
                    <input id="level" className="bg-white p-2" type="text" placeholder="eg Head boy"/>
                    <label htmlFor="file">Choose a Photo</label>
                    <input id="file" className="hidden" type="file" />
                    <button>ADD</button>
                </div>
            </div>
                <div className="flex justify-between mt-4 flex-col sm:flex-row gap-4">
                    <h2 className="dark:text-white text-slate-900 text-center text-2xl">Manage Candidates here</h2>
                    <div className="gap-4 flex pr-4">
                        <div className="flex flex-col gap-4 w-full sm:flex-row items-center justify-center gap-2">
                                <div className="relative flex gap-4 items-center">
                                    <div className="text-white flex gap-4 hover:cursor-pointer bg-[#5478FF] p-2 rounded-md">Class<ChevronDown/></div>
                                    <div onClick={togglePositionsList} className="text-white flex gap-4 hover:cursor-pointer bg-[#5478FF] p-2 rounded-md">{position !== '' ? position : 'Position'}<ChevronDown/></div>
                                    <PrefectList setShowPrefectPositions={setShowPrefectPositions}  showPrefectPositions={showPrefectPositions} setPosition={setPosition} setCandidatesList={setCandidatesList} setLoading={setLoading}/>
                                </div>
                                <div className="order-first gap-2 items-center justify-center flex">
                                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white p-2 rounded-md" placeholder="Search Candidates here"/>
                                    <SearchIcon onClick={handleSearchQuery} className="dark:text-white text-slate-900"/>
                                </div>
                                <div>
                                    <button className="text-white px-2 py-2 rounded-lg hover:cursor-pointer bg-[#5478FF]">Add a Candidate</button>
                                </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    {   loading ? <div className="h-screen flex items-center justify-center"><OrbitProgress color="#5478FF" size="medium"/></div> :
                        candidatesList.map((candidate)=>{
                            return <CandidateDetails key={candidate._id} details={candidate} />
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Candidates