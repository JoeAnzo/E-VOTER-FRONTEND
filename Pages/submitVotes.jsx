import {CheckCircle,ArrowLeft, ArrowRight} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

function SubmitVotes(){
    const navigate = useNavigate()
    function handleClick(){
        navigate('/')
    }
    return(
        <div className="flex flex-col h-screen justify-center items-center text-white space-y-4">
            <CheckCircle color='white' size={60}/>
            <h2 className='text-center'>
                Your Votes have been Submited Successfully
            </h2>
            <button onClick={handleClick} className='rounded-full p-4 bg-[#5478FF] hover:cursor-pointer hover:opacity-80'>
                <ArrowRight/>
            </button>
        </div>
    )
}

export default SubmitVotes