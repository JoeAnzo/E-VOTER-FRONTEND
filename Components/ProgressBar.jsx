import { useEffect,useState } from "react"
import { getCurrentYear } from "../utils/currentDate"
import {ClipboardCheck} from 'lucide-react'
function ProgressBar({posts,nextPost,progressBar,setProgressBar}){

    const percentage = posts.length > 0 ? Math.min(nextPost/(posts.length - 1) * 100,100) : 0
    const currentYear = getCurrentYear()
    useEffect(()=>{

        setProgressBar(percentage)
        console.log(percentage);
        
        
        },[nextPost])
    return(
        <div className="bg-white border-gray-400 border dark:bg-[#1E293B]/30 backdrop-filter backdrop-blur-xl text-slate-900 dark:text-white mt-4 space-y-4 w-[98%] mx-auto py-4 rounded-md px-2">
            <div className="flex justify-between">
                <div>
                    <div className="flex gap-2 items-start">
                        <ClipboardCheck className="dark:text-white text-slate-900"/>
                        <div>
                        <h2 className="text-left">
                            OFFICIAL BALLOT - {currentYear}<br/>
                            Prefects Election
                        </h2>
                        <p>
                            Choose one candidate per position.
                        </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h2>Positions</h2>
                    {nextPost + 1}/{posts.length}
                </div>
            </div>
            
            <div className="bg-gray-100 rounded-md h-2">
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