import { useEffect,useState} from "react";
import UserProfile from "../Components/UserProfile";
import { ArrowRight,ArrowLeft,Check} from "lucide-react";
import { fetchPrefectPosts,fetchCandidatesPerPost } from "../Services/ApiCalls";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar";
import PrefectCard from "../Components/PrefectCard";
import {OrbitProgress} from 'react-loading-indicators'

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
        <UserProfile studentInfo={JSON.parse(localStorage.getItem("studentInfo"))}/>
        <div className="text-xl text-center space-y-5">
            <ProgressBar posts={posts} nextPost={nextPost} setProgressBar={setProgressBar}/>
            <h1 className="text-center text-white text-3xl align-left">Vote your next {posts[nextPost]} prefect</h1>
            <div className="bg-red-600 relative mx-auto">
                {
                    nortification.displayError ? <div className="absolute  mx-auto w-[98%] left-0 right-0 text-red-600 font-extrabold"><h2>Vote for one of the candidates below </h2></div> :
                    <div className={`absolute flex justify-center items-center gap-2 left-0 right-0 ${nortification.displayMessage ? 'visible' : 'hidden'} mx-auto w-[98%] rounded-md font-extrabold`}>
                        <Check color='#5478FF'/>
                        <p className="text-[#5478FF]">{nortification.votedForMessage}</p>
                    </div>
                }
            </div>
            <div className="flex flex-col justify-center items-center gap-5 sm:flex-row">
                {
                        loading ? 
                        <div className="h-[200px] mt-20 flex items-center justify-center"><OrbitProgress className="mx-auto my-auto"
                         color="#5478FF" size="medium" text="" textColor="" />
                         </div> : 
                         candidates.map((candidate,index)=>{
                            return(
                                <PrefectCard key={index} candidate={candidate} setIsClicked={setIsClicked} isClicked={isClicked === index} id={index} nextPost={nextPost} setNortification={setNortification} handleNextPost={handleNextPost} posts={posts} handlePreviousPost={handlePreviousPost}/>
                            )
                        })
                }
            </div>
            <div className="flex items-end mx-auto mb-4 px-4 justify-between w-[98%]">
                {
                    loading ? null :
                    <>
                    <button className="bg-[#101540] cursor-pointer text-white py-2.5 px-5.5 rounded-md flex gap-2 items-center" onClick={handlePreviousPost}>
                        <ArrowLeft color='white'/> Back </button>
                    <button className="bg-[#101540]  cursor-pointer text-white py-2.5 px-5.5 rounded-md flex gap-2 items-center" onClick={handleNextPost}>
                        {(nextPost === posts.length - 1) ? 'Submit':'Next'} <ArrowRight color='white'/>
                    </button>
                    </>
                }
            </div>

        </div>
        
        </div>

    )
}

export default VotingHall;