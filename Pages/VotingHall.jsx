import { useEffect,useState, useContext, useRef } from "react";
import UserProfile from "../Components/UserProfile";
import { ArrowRight,Check,TriangleAlert,CircleAlert,CheckIcon} from "lucide-react";
import { fetchPrefectPosts,fetchCandidatesPerPost,fetchPrefects,submitVotes } from "../Services/ApiCalls";
import { useNavigate } from "react-router-dom";
import {userContext} from "../Contexts/userContext.js";
import ProgressBar from "../Components/ProgressBar.jsx";
import PrefectCard from "../Components/PrefectCard.jsx";
import { OrbitProgress } from 'react-loading-indicators';
import {Helmet} from 'react-helmet'

function VotingHall(){
    const scrollContainerRef = useRef(null)

    const {votedForCandidates,setIsAuth,setVotedForCandidates,OTP} = useContext(userContext)

    const [posts,setPosts] = useState([])
    const [candidates,setCandidates] = useState([])
    const [candidatesCurrentPost,setCandidatesCurrentPost] = useState([])
    const [nextPost,setNextPost] = useState(0)
    const [progressBar,setProgressBar] = useState(0)
    const [isClickedALEVELCard,setIsClickedALEVELCard] = useState(null)
    const [isClickedOLEVELCard,setIsClickedOLEVELCard] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    const errorTimerRef = useRef(null)
    const [hasSelectedAPrefect,setHasSelectedAPrefect] = useState(false)
    const [receivedCandidates,setReceivedCandidates] = useState({
        hasALEVEL:null,
        hasOLEVEL:null,
        ALEVELCandidates:[],
        OLEVELCandidates:[]
    })
   const [ALEVELCandidate,setALEVELCandidate] = useState('')
   const [OLEVELCandidate,setOLEVELCandidate] = useState('')
    const [votedForCandidatesCurrentPost,setVotedForCandidatesCurrentPost] = useState([])

    const navigate = useNavigate()
    useEffect(()=>{
       async function getData() {
        setLoading(true)
        const result = await fetchPrefectPosts()
        if (result.success){
            setPosts(result.data.prefectorial_posts);
        } else {
            showErrorMessage('Something went wrong!')
        }
        const allCandidates = await fetchPrefects()
        if (allCandidates.success){
            setLoading(false)
            setCandidates(allCandidates.data.candidates)
        } else {
            showErrorMessage('Something went wrong!')
        }
       }
       getData()
    },[])
    useEffect(()=>{
        async function getData() {
            // Filter candidates for current post
            const filteredCandidates = candidates.filter((candidate) => {
                return candidate.prefectorial_Post === `${posts[nextPost]}`
            })
            
            setCandidatesCurrentPost(filteredCandidates)
            
            if (filteredCandidates && filteredCandidates.length > 0) {
                const hasALEVEL = filteredCandidates.some((candidate) => {
                    return candidate.education_Level === "A-Level"
                })

                const hasOLEVEL = filteredCandidates.some((candidate) => {
                    return candidate.education_Level === "O-Level"
                })

                // Reset receivedCandidates
                setReceivedCandidates({
                    hasALEVEL: false,
                    hasOLEVEL: false,
                    ALEVELCandidates: [],
                    OLEVELCandidates: []
                })

                if (hasALEVEL){
                    const aLEVELCandidates = filteredCandidates.filter((candidate) => {
                        return candidate.education_Level === "A-Level"
                    })
                    setReceivedCandidates((prev) => {
                        return {
                            ...prev,
                            hasALEVEL: true,
                            ALEVELCandidates: aLEVELCandidates
                        }
                    })
                }
                
                if (hasOLEVEL){
                    const oLEVELCandidates = filteredCandidates.filter((candidate) => {
                        return candidate.education_Level === "O-Level"
                    })
                    setReceivedCandidates((prev) => {
                        return {
                            ...prev,
                            hasOLEVEL: true,
                            OLEVELCandidates: oLEVELCandidates
                        }
                    })
                }
            } else {
                setReceivedCandidates({
                    hasALEVEL: false,
                    hasOLEVEL: false,
                    ALEVELCandidates: [],
                    OLEVELCandidates: []
                })
            }
        }
        if (posts.length > 0 && candidates.length > 0) {
            getData()
        }
    },[nextPost, posts, candidates])

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [nextPost])

    useEffect(() => {
        const percentage = posts.length > 0 ? Math.min(nextPost/(posts.length - 1) * 100,100) : 0
        setProgressBar(percentage)
    },[nextPost])

    async function handleNextPost(){
        // Check if user has voted for current post
      
        const currentPost = posts[nextPost]

        // Resetting Received Candidates


        // Resetting O and A Level Candidate For the next Post

        setALEVELCandidate('')
        setOLEVELCandidate('')


        const hasVotedForCurrentPost = votedForCandidatesCurrentPost.some(candidate =>
            candidate.prefectorial_Post === currentPost
        )

        const currentPostContainsA_Level = candidatesCurrentPost.some(candidate => {
            return candidate.education_Level === 'A-Level'
        })

        const currentPostContainsO_Level = candidatesCurrentPost.some(candidate => {
            return candidate.education_Level === 'O-Level'
        })

        const currentPostContainsbothEducation_Levels = currentPostContainsA_Level && currentPostContainsO_Level

        console.log(currentPostContainsbothEducation_Levels)

        let canProceed = false
        let errorMessage = ''

        if (currentPostContainsbothEducation_Levels){
            const hasVotedForALevel = votedForCandidatesCurrentPost.some((candidate) => {
                return candidate.education_Level === "A-Level"
            })
            console.log('Has voted A-Level',hasVotedForALevel)
            const hasVotedForOLevel = votedForCandidatesCurrentPost.some((candidate) => {
                return candidate.education_Level === "O-Level"
            })
            console.log('Has voted O-Level',hasVotedForOLevel)
            
            if (hasVotedForALevel && hasVotedForOLevel){
                canProceed = true
            } else if(!hasVotedForALevel) {
                showErrorMessage(`Please vote for a ${currentPost} A-Level before proceeding.`)
            } else {
                showErrorMessage(`Please vote for a ${currentPost} O-Level before proceeding.`)
                console.log(error,errorMessage)
            }
        } else {
            // For posts with only one level or none, require at least one vote
            if (hasVotedForCurrentPost) {
                canProceed = true
            } else {
                showErrorMessage(`Please vote for a ${currentPost} before proceeding.`)
            }
        }

        if (!canProceed) {
            return
        }

        const updatedVotedForCandidates = [...votedForCandidates, ...votedForCandidatesCurrentPost]
        setVotedForCandidates(updatedVotedForCandidates)

        setIsClickedALEVELCard(null)
        setIsClickedOLEVELCard(null)

        if (nextPost === posts.length - 1){
            const submittedVotes = await submitVotes(updatedVotedForCandidates, OTP)
            console.log(submittedVotes)
            setVotedForCandidatesCurrentPost([])
            setVotedForCandidates([])
            navigate('/student/submit-vote')
            return
        }

        setNextPost((prev) => prev + 1)
        setVotedForCandidatesCurrentPost([])
    }
    function showErrorMessage(message) {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current)
      }
      setErrorMessage(message)
      setError(true)
      errorTimerRef.current = setTimeout(() => {
        setError(false)
      }, 3000)
    }
    
    useEffect(() => {
      return () => {
        if (errorTimerRef.current) {
          clearTimeout(errorTimerRef.current)
        }
      }
    }, [])

    return(
        <div className="bg-white dark:bg-[#0F172A] flex flex-col h-screen">
        <div className={`fixed left-4 right-4 top-5 z-50 rounded-md border border-gray-300 bg-white px-4 py-3 text-red-600 flex items-center gap-2 shadow-lg ${error ? 'animate-slide-in-down opacity-100' : 'animate-slide-out-up hidden  opacity-0 pointer-events-none'}`} aria-live='assertive'>
            <CircleAlert className='text-red-500'/>
            <p className='text-red-600'>{errorMessage}</p>
        </div>
        <Helmet>
            <title>Voting Hall</title>
            <meta name="description" content="Participate in your school's democratic process by voting for your preferred candidates in the E-voter platform." />
            <meta name="keywords" content="E-voter, school elections, digital voting, student voting, school leaders, democratic process" />
        </Helmet>
        <div className="shrink-0">
            <UserProfile studentInfo={JSON.parse(localStorage.getItem("studentInfo"))}/>
            <ProgressBar posts={posts} nextPost={nextPost} setProgressBar={setProgressBar}/>
        </div>
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="text-xl p-2 rounded-md text-center space-y-5 border w-[98%] mx-auto border-gray-400 mt-4">
            {/* <div className="">
                <div className="mx-auto top-95 z-40 absolute left-0 right-0">
                    {
                        nortification.displayError ? (
                            <div className="mx-auto w-[98%] left-0 right-0 text-red-600 font-extrabold p-2 rounded-md bg-red-50 border dark:bg-[#1E293B] border-red-200">
                                <p>{nortification.errorMessage || "Vote for one of the candidates below"}</p>
                            </div>
                        ) : (
                            <div className={`flex justify-center items-center left-0 right-0 ${nortification.displayMessage ? 'visible' : 'hidden'} mx-auto w-[98%] rounded-md font-extrabold p-2 bg-blue-50 border dark:bg-[#1E293B] border-blue-200`}>
                                <Check color='#5478FF'/>
                                <p className="text-[#5478FF] ml-2">{nortification.votedForMessage}</p>
                            </div>
                        )
                    }
                </div>
            </div> */}
            <div className="">
                {
                        loading ? 
                        <div className="h-50 mt-20 flex items-center justify-center"><OrbitProgress className="mx-auto my-auto"
                         color="#5478FF" size="medium"/>
                         </div>:<>
                            <div className="flex justify-between items-center w-full py-2">
                                <h1 className="text-center dark:text-white text-slate-900 my-2 text-2xl">{nextPost < 10 ? `0${nextPost + 1}`:nextPost + 1} {posts[nextPost]}</h1>
                                <div className="flex items-center gap-1">
                                    {
                                        OLEVELCandidate !== '' && ALEVELCandidate !== '' ? 
                                        <>
                                            <CheckIcon className="text-green-400"/>
                                            <p className="text-green-400">Completed</p>
                                        </>
                                         : 
                                        <>
                                            <TriangleAlert size={24} className="text-red-500"/>
                                            <p className="text-red-500">pending</p>
                                        </>
                                    }
                                    
                                </div>
                                
                            </div>
                            {/* <div className="flex flex-wrap gap-4">
                                {
                                    candidates.map((candidate,index)=>{
                                    return(
                                        <PrefectCard key={index} votedForCandidatesCurrentPost={votedForCandidatesCurrentPost} candidate={candidate} setIsClicked={setIsClicked} isClicked={isClicked === index} id={index} setNortification={setNortification} index={index} setVotedForCandidatesCurrentPost={setVotedForCandidatesCurrentPost}/>
                                        )
                                    })
                                }
                            </div> */}
                            <div className="flex flex-col">
                                
                                <div className="flex justify-between items-center w-full p-1 border border-gray-400 rounded-xl">
                                    <h2 className="text-center dark:text-white text-slate-900 my-2 text-md">{receivedCandidates.hasALEVEL? 'A-LEVEL':null}</h2>
                                    {ALEVELCandidate === '' ? <div className="flex gap-1.5 items-center"><TriangleAlert size={24} className="text-red-500"/><p className="text-red-500">pending</p></div> : <div className="flex gap-1.5"><CheckIcon className="text-green-400"/><p className="text-green-400">{ALEVELCandidate}</p></div>}
                                </div>
                                <div className="flex flex-wrap gap-4 py-2">
                                    {
                                        receivedCandidates.hasALEVEL ? receivedCandidates.ALEVELCandidates.map((candidate,index)=>{
                                        return(
                                            <PrefectCard 
                                            key={index} 
                                            votedForCandidatesCurrentPost={votedForCandidatesCurrentPost} 
                                            candidate={candidate}
                                            showErrorMessage={showErrorMessage}
                                            index={index} 
                                            setVotedForCandidatesCurrentPost={setVotedForCandidatesCurrentPost}
                                            setALEVELCandidate={setALEVELCandidate}
                                            />
                                            )
                                        }) : null
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center w-full p-1  border border-gray-400 rounded-xl">
                                    <h2 className="text-center dark:text-white text-slate-900 my-2 text-md">{receivedCandidates.hasOLEVEL ? 'O-LEVEL':null}</h2>
                                    {OLEVELCandidate === '' ? <div className="flex gap-1 items-center"><TriangleAlert className="text-red-500"/><p className="text-red-500">Pending</p></div> : <div><p className="text-green-400 flex gap-1 items-center"><CheckIcon className="text-green-400"/>{OLEVELCandidate}</p></div>}
                                </div>
                                <div className="flex flex-wrap gap-4 py-2">
                                    {
                                    receivedCandidates.hasOLEVEL ? receivedCandidates.OLEVELCandidates.map((candidate,index)=>{
                                    return(
                                        <PrefectCard 
                                        key={index}  
                                        votedForCandidatesCurrentPost={votedForCandidatesCurrentPost}
                                        candidate={candidate} 
                                        showErrorMessage={showErrorMessage} 
                                        index={index}
                                        setVotedForCandidatesCurrentPost={setVotedForCandidatesCurrentPost} 
                                        setOLEVELCandidate={setOLEVELCandidate}
                                        />
                                        )
                                    }) : null
                                    }
                                </div>
                            </div>
                            
                        </>
                }
            </div>
            <div className="flex py-4 my-20 items-end mx-auto mb-4 px-4 justify-end w-[98%]">
                {
                    loading ? null :
                    <button className="bg-[#5478FF] cursor-pointer text-white py-2.5 px-5.5 rounded-xl flex gap-2 items-center" onClick={handleNextPost}>
                        {(nextPost === posts.length - 1) ? 'Submit Votes':'Continue'} <ArrowRight color='white'/>
                    </button>
                }
            </div>
        </div>
        </div>
        
        </div>

    )

}


export default VotingHall;