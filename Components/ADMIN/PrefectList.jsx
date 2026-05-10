import React,{useEffect,useState} from 'react'
import { fetchPrefectPosts,fetchCandidatesPerPost} from '../../Services/ApiCalls'
function PrefectList({setPosition,setCandidatesList,setLoading,showPrefectPositions,setShowPrefectPositions}) {
    const [prefectorialPosts,setPrefectorialPosts] = useState([])
    
    useEffect(() => {
        async function getList(){
            const list = await fetchPrefectPosts()
            if (list.success){
                setPrefectorialPosts(list.data.prefectorial_posts)
            }
        }
        getList()
    },[])

    async function handleClick(item){
        setPosition(item)
        setShowPrefectPositions(false)
        setLoading(true)
        const prefects = await fetchCandidatesPerPost(item)
        if (prefects.success){
            setCandidatesList(prefects.data)
            setLoading(false)
        }
    }

  return (
    <ul className='absolute z-60 top-full left-[50%] bg-[#5478FF] mt-2 rounded-md text-white w-full -translate-x-[50%]'>
        {
            prefectorialPosts.map((post,index) => {
                return <li onClick={() => handleClick(post)} className={`p-2.5 hover:bg-[#1E293B] rounded-md ${showPrefectPositions ? '' : 'hidden'} `} key={index}>{post}</li>
            })
        }
    </ul>
  )
}

export default PrefectList