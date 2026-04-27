import {CheckCircle,ArrowLeft, ArrowRight} from 'lucide-react'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import { userContext } from '../Contexts/userContext'

function SubmitVotes(){
    const navigate = useNavigate()
    const {votedForCandidates,setVotedForCandidates} = useContext(userContext)
    console.log(votedForCandidates)
    function handleClick(){
        navigate('/')
    }
    return(
        <div className="flex flex-col h-screen dark:bg-[#0F172A] justify-center items-center text-slate-900 dark:text-white space-y-4">
            <Helmet>
                <title>Votes Submitted</title>
                <meta name="description" content="Your votes have been submitted successfully. Thank you for participating in the democratic process of your school elections through the E-voter platform." />
                <meta name="keywords" content="E-voter, votes submitted, successful vote submission, school elections, democratic process, student voting" />
            </Helmet>
            <CheckCircle className='dark:text-white text-slate-900' size={60}/>
            <h2 className='text-center'>
                Your Votes have been Submited Successfully
            </h2>
            <button onClick={handleClick} className='rounded-full p-4 dark:bg-[#1E293B] bg-[#5478FF] hover:cursor-pointer hover:opacity-80'>
                <ArrowRight className='text-white'/>
            </button>
        </div>
    )
}

export default SubmitVotes