import React, { useEffect,useState } from 'react'
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from 'recharts'
import { fetchStudents } from '../../Services/ApiCalls'
function SchoolAnalysisLineGraph() {
    const [barGraphData,setBarGraphData] = useState([])
    async function fetchStudentsData(){
    const studentData = await fetchStudents()
    
    if (studentData.success){
        setBarGraphData(studentData.data.Analytics)
    }
    }
    
    useEffect(()=>{
        fetchStudentsData()
    },[])

    const allKeys = barGraphData.reduce((acc,items)=>{
            Object.keys(items).forEach(key => {
                if (key !== 'Class' && !acc.includes(key)) {
                    acc.push(key)
                }
            })
            return acc
        },[])

        console.log(allKeys)
  return (
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={barGraphData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="Class" className="fill-slate-900 dark:fill-white"/>
            <YAxis className="fill-slate-900 dark:fill-white"/>
            <Tooltip/>
            <Legend formatter={(value) => <span style={{color:'white'}}>{value}</span>}/>
            {
                allKeys.map((streamName,Index)=>{
                   return <Bar key={streamName} dataKey={streamName} fill={Index % 2 === 0 ? '#8884d8':'#5478FF'}/>

                })
            } 
        </BarChart>
    </ResponsiveContainer>
  )
}

export default SchoolAnalysisLineGraph