import { useEffect,useState} from "react";
import UserProfile from "../Components/UserProfile";
import { ArrowRight,ArrowLeft } from "lucide-react";
import { fetchPrefectPosts,fetchCandidatesPerPost } from "../Services/ApiCalls";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar";
import PrefectCard from "../Components/PrefectCard";


function VotingHall(){
    const[posts,setPosts] = useState([])
    const [candidates,setCandidates] = useState([])
    const [nextPost,setNextPost] = useState(0)
    const [progressBar,setProgressBar] = useState(0)
    const [isClicked,setIsClicked] = useState(null)
    const [loading,setLoading] = useState(false)

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
                console.log(candidates)
            }
        }
        getData()
    },[nextPost,posts])

useEffect(()=>{

const percentage = posts.length > 0 ? Math.min(nextPost/(posts.length - 1) * 100,100) : 0
setProgressBar(percentage)

},[nextPost])

    function handleNextPost(){
        setIsClicked(null)
        setNextPost((prev) => prev + 1)
        setNortification(prev => {return {...prev,displayMessage:false}})
        if (nextPost === posts.length - 1){
            setNextPost(posts.length - 1)
            navigate('/student/Submit-vote')
        }
        if (isClicked === null){
            setNortification((prev) => {return {...prev,displayError:true}})
            setNextPost(nextPost)
        }
    }
    function handlePreviousPost(){
        setNextPost(prev => prev - 1)
        setNortification(prev => {return {...prev,displayMessage:false}})
        if (nextPost <= 0){
            setNextPost(0)
        }
    }


    return(
        <div>
        <UserProfile username={JSON.parse(localStorage.getItem("username"))}/>
        <div className="text-xl text-center space-y-5">
            <ProgressBar posts={posts} nextPost={nextPost} setProgressBar={setProgressBar}/>
            <h1 className="text-center text-white text-3xl align-left">Vote your next {posts[nextPost]} prefect</h1>
            <div className="bg-red-600 relative mx-auto">
                {
                    nortification.displayError ? <div className="absolute bg-[#5478FF] mx-auto w-[98%] left-0 right-0 border-l-red-700 border-l-4 text-red-700 font-extrabold"><h2>Please vote for one of the people below </h2></div> :
                    <div className={`absolute left-0 right-0 ${nortification.displayMessage ? 'visible' : 'hidden'} mx-auto w-[98%] rounded-md border-l-[#101540] border-l-10 text-white bg-[#5478FF] font-extrabold`}>
                        <h2>{nortification.votedForMessage}</h2>
                    </div>
                }
            </div>
            <div className="flex flex-col justify-center items-center gap-5 sm:flex-row">
                {
            candidates.map((candidate,index)=>{
                return(
                    <>
                    {
                        loading ? <h2>Loading...</h2> : <PrefectCard key={index} candidate={candidate} setIsClicked={setIsClicked} isClicked={isClicked === index} id={index} nextPost={nextPost} setNortification={setNortification} handleNextPost={handleNextPost} posts={posts} handlePreviousPost={handlePreviousPost}/>
                    }
                    </>
                )
            })
                }
            </div>
            <div className="flex items-end mx-auto mb-4 px-4 justify-between w-[98%]">
                {
                    candidates.length > 0 ?
                    <>
                    <button className="bg-[#101540] cursor-pointer text-white py-2.5 px-5.5 rounded-md flex gap-2 items-center" onClick={handlePreviousPost}>
                        <ArrowLeft color='white'/> Back </button>
                    <button className="bg-[#101540]  cursor-pointer text-white py-2.5 px-5.5 rounded-md flex gap-2 items-center" onClick={handleNextPost}>
                        {(nextPost === posts.length - 1) ? 'Submit Form':'Next'} <ArrowRight color='white'/>
                    </button>
                    </> : null
                }
            </div>

        </div>
        
        </div>

    )
}

export default VotingHall;