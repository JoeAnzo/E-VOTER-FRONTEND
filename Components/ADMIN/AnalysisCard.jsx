
import {useState,useEffect} from 'react'
function AnalysisCard({heading,icon,numberDisplay}) {
  const [animateFigures,setAnimateFigures] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateFigures((prevCount) => {
        if (prevCount >= 1000) {
          clearInterval(interval)
          return prevCount
        }
        return prevCount + 1
      })
    }, 10)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="text-white py-10 rounded-lg shadow-2xl hover:cursor-pointer transition-all transition-ease hover:-translate-y-4 duration-500 hover:bg-[#5478FF] bg-[#1E293B] sm:w-100 w-[98%] flex items-center justify-evenly gap-4">
        <div className="flex flex-col items-center justify-center">
          <h2>{heading}</h2>
          <h2>{animateFigures}</h2>
        </div>
        <div className="bg-[#0F172A] p-2 rounded-md">
          {icon}
        </div>
    </div>
  )
}

export default AnalysisCard