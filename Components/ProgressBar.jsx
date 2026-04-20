import { useEffect,useState } from "react"

function ProgressBar({posts,nextPost,progressBar,setProgressBar}){

    const percentage = posts.length > 0 ? Math.min(nextPost/(posts.length - 1) * 100,100) : 0

    useEffect(()=>{

        setProgressBar(percentage)
        console.log(percentage);
        
        
        },[nextPost])
    return(
        <div className="bg-[#1E293B] text-white mt-4 space-y-4 w-[98%] mx-auto py-10 rounded-md px-2">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-left">
                    Your Progress
                    <p>You have {posts.length > 0 ? posts.length - (nextPost + 1):0} Prefect positions left</p>
                    </h2>
                </div>
                <div>
                    {nextPost + 1}/{posts.length}
                </div>
            </div>
            
            <div className="bg-gray-100 rounded-md h-4">
                <div
                style={{
                    width:`${percentage}%`
                }
                }
                className={`bg-[#5478FF] h-full transition-all duration-300 rounded-md`}>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar;