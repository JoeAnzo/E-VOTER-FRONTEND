import { useEffect,useState, useContext, useRef } from "react";
import UserProfile from "../Components/UserProfile";
import { ArrowRight,Check} from "lucide-react";
import { fetchPrefectPosts,fetchCandidatesPerPost,submitVotes } from "../Services/ApiCalls";
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
    const [nextPost,setNextPost] = useState(0)
    const [progressBar,setProgressBar] = useState(0)
    const [isClicked,setIsClicked] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [votedForCandidatesCurrentPost,setVotedForCandidatesCurrentPost] = useState([])

    const [nortification,setNortification] = useState({
        errorMessage:'',
        displayError:false,
        votedForMessage:'',
        displayMessage:false
    })

    const navigate = useNavigate()
    useEffect(()=>{
       async function getData() {
        const result = await fetchPrefectPosts()
        if (result.success){
            setPosts(result.data.prefectorial_posts);
            console.log(posts)
        } else {
            setError(true)
        }
       }
       getData()
    },[])
    useEffect(()=>{

        async function getData() {
            setLoading(true)
            const result = await fetchCandidatesPerPost(`${posts[nextPost]}`)
            console.log(result)
            setLoading(false)
            if (result.success) {
                setCandidates(result.data)
            } else {
                setError(true)
            }
        }
        if (posts.length > 0) {
            getData()
        }
    },[nextPost,posts])

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

        const hasVotedForCurrentPost = votedForCandidatesCurrentPost.some(candidate =>
            candidate.prefectorial_Post === currentPost
        )

        const currentPostContainsA_Level = candidates.some(candidate => {
            return candidate.education_Level === 'A-Level'
        })

        const currentPostContainsO_Level = candidates.some(candidate => {
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
                errorMessage = `Please vote for a ${currentPost} A-Level before proceeding.`
            } else {
                errorMessage = `Please vote for a ${currentPost} O-Level before proceeding.`
            }
        } else {
            // For posts with only one level or none, require at least one vote
            if (hasVotedForCurrentPost) {
                canProceed = true
            } else {
                errorMessage = `Please vote for a ${currentPost} before proceeding.`
            }
        }

        if (!canProceed) {
            setNortification((prev) => ({
                ...prev,
                displayError: true,
                displayMessage: false,
                errorMessage: errorMessage
            }))
            return
        }

        const updatedVotedForCandidates = [...votedForCandidates, ...votedForCandidatesCurrentPost]
        setVotedForCandidates(updatedVotedForCandidates)

        setIsClicked(null)
        setNortification(prev => ({...prev, displayMessage: false, displayError: false}))

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
    return(
        <div className="bg-white dark:bg-[#0F172A] flex flex-col h-screen">
        <Helmet>
            <title>Voting Hall</title>
            <meta name="description" content="Participate in your school's democratic process by voting for your preferred candidates in the E-voter platform." />
            <meta name="keywords" content="E-voter, school elections, digital voting, student voting, school leaders, democratic process" />
        </Helmet>
        <div className="shrink-0">
            <UserProfile studentInfo={JSON.parse(localStorage.getItem("studentInfo"))}/>
            <ProgressBar posts={posts} nextPost={nextPost} setProgressBar={setProgressBar}/>
            <h1 className="text-center dark:text-white text-slate-900 mt-8 text-3xl align-left">Vote your next {posts[nextPost]} prefect</h1>
        </div>
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        <div className="text-xl text-center space-y-5">
            <div className="">
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
            </div>
            <div className="flex flex-col flex-wrap hide-scrollbar justify-center sticky items-center gap-5 sm:flex-row mt-20 pt-10 sm:mt-0">
                {
                        loading ? 
                        <div className="h-50 mt-20 flex items-center justify-center"><OrbitProgress className="mx-auto my-auto"
                         color="#5478FF" size="medium"/>
                         </div>:error ? <p className="text-red-700 text-center">Something went wrong</p>:<>
                            {
                         candidates.map((candidate,index)=>{
                            return(
                                <PrefectCard key={index} votedForCandidatesCurrentPost={votedForCandidatesCurrentPost} candidate={candidate} setIsClicked={setIsClicked} isClicked={isClicked === index} id={index} setNortification={setNortification} index={index} setVotedForCandidatesCurrentPost={setVotedForCandidatesCurrentPost}/>
                            )
                        })
                }
                        </>
                }
            </div>
            <div className="flex py-4 my-20 items-end mx-auto mb-4 px-4 justify-end w-[98%]">
                {
                    loading ? null :
                    <button className="dark:bg-[#1E293B] bg-[#5478FF] cursor-pointer text-white py-2.5 px-5.5 rounded-md flex gap-2 items-center" onClick={handleNextPost}>
                        {(nextPost === posts.length - 1) ? 'Submit':'Next'} <ArrowRight color='white'/>
                    </button>
                }
            </div>
        </div>
        </div>
        
        </div>

    )

}


export default VotingHall;