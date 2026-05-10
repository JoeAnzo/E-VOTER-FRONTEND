import { useEffect,useState } from "react"
import { fetchStudents } from "../../Services/ApiCalls"
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from 'recharts'

function SchoolVotingProcress(){

    const [graphData,setGraphData] = useState([])


    useEffect(() => {
        async function getStudentsDoneVoting(){
        const students = await fetchStudents()
        if (students.success){
            setGraphData(students.data.votingAnalysis)
          }
        }
        getStudentsDoneVoting()
    },[])

    const streams = graphData.reduce((acc,{Streams}) => {
        Object.keys(Streams).forEach(key => {
            if (!acc.includes(key)){
                acc.push(key)
            }
            
        })
        return acc
    },[])

    const flattenedData = graphData.map((item) => ({
        Class:item.Class,
        ...item.Streams
    }))

    console.log(graphData)

    return(
       
            <ResponsiveContainer width="100%" height={500}>
                <BarChart data={flattenedData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="Class" className="fill-slate-900 dark:fill-white"/>
                    <YAxis className="fill-slate-900 dark:fill-white"/>
                    <Tooltip/>
                    <Legend formatter={(value) => <span style={{color:'white'}}>{value}</span>}/>
                    {
                        streams.map((streamName,Index) => {
                            console.log(streamName)
                            return <Bar key={streamName} dataKey={streamName} fill={Index % 2 === 0 ? '#8884d8':'#5478FF'}/>
                        })
                    }
                </BarChart>
            </ResponsiveContainer>
    
    )
}

export default SchoolVotingProcress