import AdminNavBar from "../../Components/ADMIN/AdminNavBar"
import { fetchPrefectPosts } from "../../Services/ApiCalls.js"
import SideBar from "../../Components/ADMIN/SideBar"
import ResultsBarChartPerPost from "../../Components/ResultsBarChartPerPost.jsx"
import {Helmet} from 'react-helmet'
import { useState,useEffect } from "react"
function ElectionProgress() {
    const [posts,setPosts] = useState([])
    async function getPosts(){
        const prefectorialPost = await fetchPrefectPosts()
        if (prefectorialPost.success){
            setPosts(prefectorialPost.data.prefectorial_posts)
            
        }
    }
    useEffect(() => {
        getPosts()
    },[])

    console.log(posts)
  return (
    <div className="h-screen relative">
        <Helmet>
            <title>Election Progress</title>
            <meta name="description" content="Monitor the progress of your school's elections in real-time through the E-voter platform." />
            <meta name="keywords" content="E-voter, election progress, real-time voting, school elections, democratic process" />
        </Helmet>

        <AdminNavBar/>
        <div className="h-[90%] flex"> 
            <div className="sm:w-[20%]">
                <SideBar/>
            </div>
            <div className="sm:w-[80%] w-full overflow-scroll hide-scrollbar">
                <div className="flex justify-between mt-4">
                    <h2 className="dark:text-white text-slate-900 text-lg sm:text-2xl my-4">View the elections live here</h2>
                </div>
                 <div className="dark:text-white text-slate-900">
                        {
                            posts.map((post,index) => {
                                return <ResultsBarChartPerPost key={index} post={post}/>
                            })
                        }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ElectionProgress