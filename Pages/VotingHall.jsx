import { useEffect,useState, useContext} from "react";
import UserProfile from "../Components/UserProfile";
import { ArrowRight,ArrowLeft,Check} from "lucide-react";
import { fetchPrefectPosts,fetchCandidatesPerPost } from "../Services/ApiCalls";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar";
import PrefectCard from "../Components/PrefectCard";
import {OrbitProgress} from 'react-loading-indicators'
import { userContext } from "../Contexts/userContext";

function VotingHall(){

    const {votedForCandidates,setVotedForCandidates} = useContext(userContext)

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
        const prefectPosts = await fetchPrefectPosts()
        if (prefectPosts){
            setPosts(prefectPosts.prefectorial_posts);
            console.log(posts)
        }
       }
       getData()
    },[])
    useEffect(()=>{

        async function getData() {
            setLoading(true)
            const prefects = await fetchCandidatesPerPost(`${posts[nextPost]}`)
            console.log(prefects)
            if (prefects) {
                setLoading(false)
                setCandidates(prefects)

            }
        }
        getData()
    },[nextPost,posts])

useEffect(()=>{

const percentage = posts.length > 0 ? Math.min(nextPost/(posts.length - 1) * 100,100) : 0
setProgressBar(percentage)

},[nextPost])

    function handleNextPost(){
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
                setVotedForCandidates((prev) => {
                    return [...prev,...votedForCandidatesCurrentPost]
                })
            } else if(!hasVotedForALevel) {
                errorMessage = `Please vote for a ${currentPost} A-Level before proceeding.`
            } else {
                errorMessage = `Please vote for a ${currentPost} O-Level before proceeding.`
            }
        } else {
            // For posts with only one level or none, require at least one vote
            if (hasVotedForCurrentPost) {
                canProceed = true
                setVotedForCandidates((prev) => {
                    return [...prev,...votedForCandidatesCurrentPost]
                })
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

        setIsClicked(null)
        setNextPost((prev) => prev + 1)
        setNortification(prev => ({...prev, displayMessage: false, displayError: false}))

        if (nextPost === posts.length - 1){
            setNextPost(posts.length - 1)
            navigate('/student/submit-vote')
        }
        setVotedForCandidatesCurrentPost([])
    }
    return(
        <div>
        <UserProfile studentInfo={JSON.parse(localStorage.getItem("studentInfo"))}/>
        <div className="text-xl text-center space-y-5">
            <ProgressBar posts={posts} nextPost={nextPost} setProgressBar={setProgressBar}/>
            <h1 className="text-center text-white text-3xl align-left">Vote your next {posts[nextPost]} prefect</h1>
            <div className="relative mx-auto min-h-[40px]">
                {
                    nortification.displayError ? (
                        <div className="absolute mx-auto w-[98%] left-0 right-0 text-red-600 font-extrabold p-2 rounded-md">
                            <p>{nortification.errorMessage || "Vote for one of the candidates below"}</p>
                        </div>
                    ) : (
                        <div className={`absolute flex justify-center items-center left-0 right-0 ${nortification.displayMessage ? 'visible' : 'hidden'} mx-auto w-[98%] rounded-md font-extrabold p-2`}>
                            <Check color='#5478FF'/>
                            <p className="text-[#5478FF] ml-2">{nortification.votedForMessage}</p>
                        </div>
                    )
                }
            </div>
            <div className="flex flex-col flex-wrap justify-center items-center gap-5 sm:flex-row mt-20 sm:mt-0">
                {
                        loading ? 
                        <div className="h-[200px] mt-20 flex items-center justify-center"><OrbitProgress className="mx-auto my-auto"
                         color="#5478FF" size="medium" text="" textColor="" />
                         </div> :<>
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
            <div className="flex mt-20 items-end mx-auto mb-4 px-4 justify-end w-[98%]">
                {
                    loading ? null :
                    <button className="bg-[#101540] cursor-pointer text-white py-2.5 px-5.5 rounded-md flex gap-2 items-center" onClick={handleNextPost}>
                        {(nextPost === posts.length - 1) ? 'Submit':'Next'} <ArrowRight color='white'/>
                    </button>
                }
            </div>

        </div>
        
        </div>

    )

}


export default VotingHall;