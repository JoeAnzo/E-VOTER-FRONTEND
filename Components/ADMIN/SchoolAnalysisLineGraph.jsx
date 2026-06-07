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
    console.log(barGraphData)
    const allKeys = barGraphData.reduce((acc,items)=>{
            console.log(items)
            Object.keys(items).forEach(key => {
                if (key !== 'Class' && !acc.includes(key)) {
                    acc.push(key)
                }
            })
            return acc
        },[])

        console.log(allKeys)
  return (
    <div style={{overflowX:'auto', width:'100%'}} className="hide-scrollbar">
        <div style={{minWidth: 760, width: '100%'}}> 
    <ResponsiveContainer className="border border-gray-400 dark:bg-[#1E293B] rounded-md" width="100%" height={500}>
        <BarChart data={barGraphData}
        margin={{
            top:10,
            right:20,
            left:-10,
            bottom:20
        }}
        barCategoryGap={10}
        >
            <CartesianGrid strokeDasharray="4 4" vertical={false} horizontal={false} stroke='#f0f0f0'/>
            <XAxis dataKey="Class" 
            className="fill-slate-900 dark:fill-white"
            axisLine={false}
            tickLine={false}
            tick={{fill:'#9ca3af',fontSize:12,fontFamily:'sans-serif'}}
            />
            <YAxis className="fill-slate-900 dark:fill-white"
            axisLine={false}
            tickLine={false}
            tick={{fill:'#9ca3af',fontSize:12,fontFamily:'sans-serif'}}
            />
            <Tooltip
            cursor={{fill:'#f3f4f6',opacity: 0.6}}
            contentStyle={{
                backgroundColor:'#1f2937',
                borderRadius:'8px',
                border:'none',
                color:'#ffffff',
                fontSize:'13px',
                boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'
            }}
            />
            <Legend formatter={(value) => <span style={{color:'white'}}>{value}</span>}/>
            {
                allKeys.map((streamName,Index)=>{
                   return (<Bar key={streamName}
                       dataKey={streamName}
                       fill={Index % 2 === 0 ? '#8884d8':'#5478FF'}
                       radius={[4,4,0,0]}
                       
                   />)
                })
            } 
        </BarChart>
    </ResponsiveContainer>
        </div>
    </div>

  )
}

export default SchoolAnalysisLineGraph