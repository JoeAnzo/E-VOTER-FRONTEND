
import {useState,useEffect} from 'react'
function AnalysisCard({heading,icon,numberDisplay}) {
  const [animateFigures,setAnimateFigures] = useState(0)
  console.log(numberDisplay)
  useEffect(() => {
    setAnimateFigures(0)
    const interval = setInterval(() => {
      setAnimateFigures((prevCount) => {
        if (prevCount >= numberDisplay) {
          clearInterval(interval)
          return prevCount
        }
        return prevCount + 1
      })
    }, 10)
    return () => clearInterval(interval)
  }, [numberDisplay])
  return (
    <div className="dark:text-white border border-gray-400 backdrop-filter backdrop-blur-xl hover:text-white text-slate-900 py-10 rounded-lg hover:cursor-pointer bg-white/30 dark:bg-[#1E293B] shadow-md hover:shadow-xl transition-all duration-200 ease-out transform-gpu hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-[#5478FF] sm:w-full w-[98%] flex items-center justify-evenly gap-4">
        <div className="flex flex-col items-center justify-center">
          <h2>{heading}</h2>
          <h2>{animateFigures}</h2>
        </div>
        <div className="bg-[#5478FF] p-2 rounded-md">
          {icon}
        </div>
    </div>
  )
}

export default AnalysisCard